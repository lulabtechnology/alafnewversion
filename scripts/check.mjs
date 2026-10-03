import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
async function walk(dir){const files=[];for(const entry of await readdir(dir,{withFileTypes:true})){const filename=path.join(dir,entry.name);files.push(...(entry.isDirectory()?await walk(filename):[filename]));}return files;}
const files=await walk(root);const htmlFiles=files.filter(file=>file.endsWith('.html'));
assert.equal(htmlFiles.length,7,'Se esperan siete documentos HTML.');
let references=0;
for(const filename of htmlFiles){
 const html=await readFile(filename,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`Un único H1 en ${filename}`);
 assert.ok(html.includes('<html lang="es">'));
 assert.ok(!/ALAF_LOGO_DATA|<!--\s*TODO|lorem ipsum/i.test(html));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(ids.length,new Set(ids).size,`IDs duplicados en ${filename}`);
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const url=match[1];if(/^(?:https?:|mailto:|data:)/.test(url))continue;
   const [withoutQuery,hash]=url.split('#');const local=withoutQuery.split('?')[0];
   const target=local?path.resolve(local.startsWith('/')?root:path.dirname(filename),local.replace(/^\//,'')):filename;
   assert.ok(target===root||target.startsWith(root+path.sep),`Ruta fuera de dist: ${url}`);
   const info=await stat(target).catch(()=>null);assert.ok(info?.isFile(),`Recurso faltante en ${filename}: ${url}`);
   if(hash&&target.endsWith('.html')){const targetHtml=target===filename?html:await readFile(target,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`Ancla faltante: ${url}`);}
   references++;
 }
 assert.ok(html.includes('https://campus.alafinternationalacademy.com/'));
 for(const number of ['50763993131','50767104100','50766138592'])assert.ok(html.includes(`https://wa.me/${number}`));
}
const home=await readFile(path.join(root,'index.html'),'utf8');
for(const id of ['inicio','about','benefits','por-que-nosotros','servicios','testimonios','contacto'])assert.ok(home.includes(`id="${id}"`));
const font=await readFile(path.join(root,'assets/jakarta-latin.woff2'));assert.ok(font.length>1000);
assert.ok(files.some(file=>file.endsWith('.htaccess')));
console.log(`Comprobación correcta: ${htmlFiles.length} páginas, ${references} referencias locales y todas las anclas antiguas.`);
