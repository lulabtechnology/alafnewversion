import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { handleContact } from '../server/contact.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
  if(req.url?.split('?')[0]==='/api/contact'){
    if(req.method!=='POST'){res.writeHead(405,{...headers,'Allow':'POST','Content-Type':'application/json'});res.end(JSON.stringify({ok:false,message:'Método no permitido.'}));return;}
    const chunks=[];let size=0;
    for await(const chunk of req){size+=chunk.length;if(size>12000){res.writeHead(413,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,message:'Consulta demasiado extensa.'}));return;}chunks.push(chunk);}
    const request=new Request(`http://${req.headers.host}/api/contact`,{method:'POST',headers:req.headers,body:Buffer.concat(chunks)});
    const result=await handleContact(request,{ip:req.socket.remoteAddress||'unknown',allowedOrigin:process.env.CONTACT_ALLOWED_ORIGIN||`http://${req.headers.host}`});
    res.writeHead(result.status,{...headers,...Object.fromEntries(result.headers)});res.end(await result.text());return;
  }
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{...headers,'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
  try{
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname.includes('\0'))throw new Error('Invalid path');
    let target=path.resolve(root,`.${pathname}`);
    if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403,headers);res.end('Forbidden');return;}
    let info;
    try{info=await stat(target);}catch{}
    if(info?.isDirectory()){
      if(!pathname.endsWith('/')){res.writeHead(301,{...headers,Location:pathname+'/'});res.end();return;}
      target=path.join(target,'index.html');
    }
    let status=200;
    let data;
    try{data=await readFile(target);}catch{target=path.join(root,'404.html');data=await readFile(target);status=404;}
    res.writeHead(status,{...headers,'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(400,headers);res.end('Bad request');}
});
server.listen(port,'127.0.0.1',()=>console.log(`ALAF: http://127.0.0.1:${port}/`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
