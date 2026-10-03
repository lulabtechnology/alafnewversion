const modes={virtual:'Virtual School',homeschool:'Homeschool acompañado',orientacion:'Quiero orientación'};
const limiter=new Map();
const reply=(status,message,ok=false)=>new Response(JSON.stringify({ok,message}),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});

export function validateContact(input){
  if(!input||typeof input!=='object'||Array.isArray(input))return{error:'Consulta inválida.'};
  const data={};
  for(const key of ['name','email','phone','mode','message','website']){
    if(input[key]!==undefined&&typeof input[key]!=='string')return{error:'Consulta inválida.'};
    data[key]=(input[key]||'').trim();
  }
  if(data.website)return{error:'No pudimos procesar la consulta.'};
  if(data.name.length<2||data.name.length>80||/[\r\n]/.test(data.name))return{error:'Revisa el nombre.'};
  if(data.email.length>160||!/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email)||/[\r\n]/.test(data.email))return{error:'Revisa el correo.'};
  if(data.phone.length>32||/[\r\n]/.test(data.phone))return{error:'Revisa el teléfono.'};
  if(!Object.hasOwn(modes,data.mode))return{error:'Selecciona una modalidad.'};
  if(data.message.length<10||data.message.length>2000)return{error:'Escribe un mensaje de entre 10 y 2000 caracteres.'};
  if(input.consent!==true)return{error:'El consentimiento es necesario para atender la consulta.'};
  return{data};
}

export async function handleContact(request,{ip='unknown',allowedOrigin=process.env.CONTACT_ALLOWED_ORIGIN,env=process.env,fetcher=fetch,now=Date.now()}={}){
  if(request.method!=='POST')return reply(405,'Método no permitido.');
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return reply(415,'Formato no permitido.');
  const origin=request.headers.get('origin');
  if(!allowedOrigin||origin!==allowedOrigin)return reply(403,'Origen no permitido.');
  const body=await request.text();
  if(Buffer.byteLength(body)>12000)return reply(413,'Consulta demasiado extensa.');
  let input;
  try{input=JSON.parse(body);}catch{return reply(400,'Consulta inválida.');}
  const validation=validateContact(input);
  if(validation.error)return reply(400,validation.error);
  if(!env.RESEND_API_KEY||!env.CONTACT_FROM||!env.CONTACT_TO)return reply(503,'El envío por correo no está disponible. Puedes contactar por WhatsApp.');
  const previous=limiter.get(ip)||[];
  const times=previous.filter(time=>now-time<3600000);
  if(times.length>=5)return reply(429,'Has realizado varias consultas. Espera un momento o contacta por WhatsApp.');
  if(limiter.size>2000){for(const [key,entries]of limiter)if(entries.every(time=>now-time>=3600000))limiter.delete(key);}
  if(limiter.size>=5000&&!limiter.has(ip))return reply(429,'Intenta más tarde o contacta por WhatsApp.');
  limiter.set(ip,[...times,now]);
  const {data}=validation;
  const text=`Consulta de admisión — ALAF\n\nNombre: ${data.name}\nCorreo: ${data.email}\nTeléfono: ${data.phone||'No indicado'}\nModalidad: ${modes[data.mode]}\n\n${data.message}\n\nConsentimiento de contacto: aceptado.`;
  try{
    const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:data.email,subject:`Consulta ALAF · ${modes[data.mode]}`,text}),signal:AbortSignal.timeout(10000)});
    if(!response.ok)return reply(502,'No pudimos entregar la consulta. Usa WhatsApp o inténtalo más tarde.');
    let result;try{result=await response.json();}catch{return reply(502,'No pudimos confirmar la entrega. Contacta por WhatsApp.');}
    if(typeof result.id!=='string'||!result.id)return reply(502,'No pudimos confirmar la entrega. Contacta por WhatsApp.');
    return reply(200,'Consulta entregada al servicio de correo.',true);
  }catch{return reply(502,'El servicio de correo no respondió. Puedes contactar por WhatsApp.');}
}
