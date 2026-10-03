import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pageShell } from '../src/components.mjs';
import { home } from '../src/pages/home.mjs';
import { program } from '../src/pages/programs.mjs';
import { about, admissions, privacy, notFound } from '../src/pages/information.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const site=JSON.parse(await readFile(path.join(root,'src','site.json'),'utf8'));
if (!['whatsapp','email'].includes(site.contact.transport)) throw new Error('src/site.json: contact.transport debe ser whatsapp o email.');
const required=['logo.png','jakarta-latin.woff2','mundo-alaf.webp','familia-collage.webp','alafito-saludo.webp','alafito-leyendo.webp','alafito-guia.webp','virtual-school.webp','programacion.webp','finanzas.webp','emprendimiento.webp','campus-digital.webp','mural-cierre.webp','compartir-alaf.jpg','styles.css','main.js','OFL.txt'];
await mkdir(path.join(dist,'assets'),{recursive:true});
for(const asset of required) await copyFile(path.join(root,'src','assets',asset),path.join(dist,'assets',asset));
const pages=[['index.html',home(site)],['virtual-school/index.html',program(site,'virtual')],['homeschool/index.html',program(site,'homeschool')],['nosotros/index.html',about(site)],['admisiones/index.html',admissions(site)],['privacidad/index.html',privacy(site)],['404.html',notFound(site)]];
for(const [filename,page] of pages){const destination=path.join(dist,filename);await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,pageShell(site,page),'utf8');}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(([,page])=>!page.noindex).map(([,page])=>`<url><loc>${site.url}${page.route||'/'}</loc></url>`).join('')}</urlset>\n`;
await writeFile(path.join(dist,'sitemap.xml'),sitemap,'utf8');
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`,'utf8');
for(const filename of ['_headers','.htaccess']) await copyFile(path.join(root,'src',filename),path.join(dist,filename));
await writeFile(path.join(dist,'manifest.webmanifest'),JSON.stringify({name:site.name,short_name:'ALAF',lang:'es',start_url:'./',display:'browser',theme_color:'#ffffff',background_color:'#ffffff'},null,2),'utf8');
await import('./gallery.mjs');
console.log(`Web generada: ${pages.length} páginas en dist/. Contacto: ${site.contact.transport}. Sin dependencias de instalación.`);
