import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact,handleContact } from '../server/contact.mjs';
const valid={name:'Familia de prueba',email:'familia@example.com',phone:'',mode:'virtual',message:'Consulta sintética para una prueba local.',website:'',consent:true};
const request=(input=valid,origin='https://alafinternationalacademy.com')=>new Request('https://alafinternationalacademy.com/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify(input)});
const env={RESEND_API_KEY:'test-only-key',CONTACT_FROM:'ALAF <prueba@example.com>',CONTACT_TO:'destino@example.com'};
const options={allowedOrigin:'https://alafinternationalacademy.com',env,ip:'test-1'};
test('rechaza datos inválidos, consentimiento ausente y campos de spam',()=>{
 assert.ok(validateContact({...valid,consent:false}).error);
 assert.ok(validateContact({...valid,mode:'no-existe'}).error);
 assert.ok(validateContact({...valid,email:'a@example.com\r\nBCC:otro@example.com'}).error);
 assert.ok(validateContact({...valid,website:'spam'}).error);
 assert.ok(validateContact({...valid,message:'breve'}).error);
 assert.ok(validateContact({...valid,name:123}).error);
});
test('un origen externo no alcanza al proveedor',async()=>{
 let calls=0;const response=await handleContact(request(valid,'https://externo.example'),{...options,fetcher:async()=>{calls++;throw new Error();}});
 assert.equal(response.status,403);assert.equal(calls,0);
});
test('sin credenciales nunca comunica un envío exitoso',async()=>{
 const response=await handleContact(request(),{...options,env:{}});assert.equal(response.status,503);assert.equal((await response.json()).ok,false);
});
test('solo comunica éxito si el proveedor devuelve un identificador',async()=>{
 let payload;const response=await handleContact(request(),{...options,fetcher:async(url,settings)=>{assert.equal(url,'https://api.resend.com/emails');payload=JSON.parse(settings.body);return new Response(JSON.stringify({id:'email-test-1'}),{status:200});}});
 assert.equal(response.status,200);assert.equal((await response.json()).ok,true);assert.equal(payload.reply_to,valid.email);assert.deepEqual(payload.to,['destino@example.com']);
});
test('maneja una falla del proveedor y una respuesta sin confirmación',async()=>{
 const failed=await handleContact(request(),{...options,ip:'test-2',fetcher:async()=>new Response('fallo',{status:503})});assert.equal(failed.status,502);assert.equal((await failed.json()).ok,false);
 const unconfirmed=await handleContact(request(),{...options,ip:'test-3',fetcher:async()=>new Response('{}',{status:200})});assert.equal(unconfirmed.status,502);
});
test('limita intentos repetidos sin una llamada adicional al proveedor',async()=>{
 let calls=0;const config={...options,ip:'test-limiter',fetcher:async()=>{calls++;return new Response('{"id":"test"}',{status:200});}};
 for(let i=0;i<5;i++)assert.equal((await handleContact(request(),config)).status,200);
 assert.equal((await handleContact(request(),config)).status,429);assert.equal(calls,5);
});
