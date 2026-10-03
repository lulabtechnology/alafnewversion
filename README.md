# ALAF International Academy — web artística

Entrega local completa. Diseño responsive, logo original de ALAF y 11 assets de collage generados con ImageGen, incluidas tres poses de Alafito. Incluye siete documentos HTML, recursos locales, código fuente, documentación y contacto opcional por correo.

## Ver la web inmediatamente

Extrae todo el ZIP y abre `ABRIR-WEB.html` o directamente `dist/index.html` con Chrome, Edge o Firefox. Conserva la estructura de carpetas. El menú, las páginas, las preguntas frecuentes y el formulario de WhatsApp funcionan sin instalar dependencias. Los enlaces externos necesitan internet. El navegador puede usar una fuente de sistema al abrir archivos locales; el servidor local reproduce el entorno de publicación.

`dist/` contiene la versión lista para subir a un hosting estático.

## Ejecutar y editar

Requisito: Node.js 20.12 o posterior. No hay paquetes que instalar.

```sh
npm run dev
```

Abre `http://127.0.0.1:4173/`. Después de editar, vuelve a generar y recarga el navegador:

```sh
npm run build
npm run check
```

`npm start` sirve la versión existente de `dist/`. Para cambiar el puerto configura `PORT`.

## Qué contiene

```text
dist/                         Web lista para hosting estático
src/site.json                 Dominio, contactos y modo del formulario
src/components.mjs            Encabezado, pie, formularios y componentes
src/pages/home.mjs            Inicio
src/pages/programs.mjs        Virtual School y Homeschool
src/pages/information.mjs     Nosotros, Admisiones, Privacidad y 404
src/assets/styles.css         Diseño y puntos de cambio responsive
src/assets/main.js            Menú y formulario
src/assets/*-original.png     Imágenes nuevas a resolución original
server/contact.mjs            Envío opcional por correo
netlify/functions/contact.mjs Adaptador opcional para Netlify
scripts/                      Generación, servidor, comprobación y assets
tests/                        Pruebas del formulario por correo
docs/                         Marca, contenido, publicación y prompts
preview/                      Capturas de escritorio, móvil y firma
```

## Publicar la versión estática

1. Respalda el sitio actual.
2. Sube **el contenido de `dist/`**, no toda la carpeta fuente, a la raíz pública del dominio.
3. Mantén el subdominio `campus.alafinternationalacademy.com` y sus registros DNS.
4. Comprueba las páginas y los contactos. Las anclas antiguas se mantienen en Inicio.

El modo predeterminado es WhatsApp. No requiere un servidor de correo: el visitante prepara su mensaje y luego lo revisa y envía en WhatsApp. La web no presenta la preparación como si el mensaje ya hubiera sido enviado.

La entrega incorpora `robots.txt`, `sitemap.xml`, metadata social y datos estructurados. Si publicas en un dominio diferente, cambia `url` en `src/site.json` y ejecuta `npm run build`.

## Activar contacto por correo

La opción por correo está implementada, pero necesita un servicio configurado y un remitente verificado. No se han enviado mensajes reales durante las pruebas.

1. Configura un dominio de envío en Resend y crea una clave con permiso de envío.
2. En el servidor configura `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` y `CONTACT_ALLOWED_ORIGIN`. El origen debe coincidir exactamente con el dominio de la web, sin barra final.
3. Cambia `contact.transport` de `whatsapp` a `email` en `src/site.json`.
4. Ejecuta `npm run build` y publica la web con el endpoint `/api/contact`.

Para probar el adaptador local, copia `.env.example` a `.env`, configura los valores y ejecuta:

```sh
node --env-file=.env scripts/serve.mjs
```

Para el servidor local usa `CONTACT_ALLOWED_ORIGIN=http://127.0.0.1:4173`. En producción configura el origen público real. Nunca subas `.env` a una carpeta pública ni incluyas una clave de envío en HTML o JavaScript del navegador.

En Netlify, utiliza el proyecto completo y la configuración `netlify.toml`. Define las variables de entorno en el servicio de hosting. El adaptador declara `/api/contact` mediante la configuración de la función.

Un hosting exclusivamente estático o una subida por arrastrar `dist/` no ejecuta la función de correo. En ese caso conserva el modo WhatsApp. El limitador del backend es básico y vive en memoria por instancia; para un formulario público con tráfico alto configura protección y límites persistentes en el hosting.

## Revisiones antes de reemplazar el sitio público

Revisa `docs/CONTENIDO.md`: datos operativos, testimonio y política de privacidad requieren validación de ALAF. La web no inventa costos, grados disponibles, fechas de matrícula, docentes ni certificaciones. Los canales de contacto y el campus conservan los destinos de la web actual.

No se cambió el dominio público ni el campus. Esta entrega es un paquete local, listo para revisión y publicación.

## Assets

El logo original está en `src/assets/logo.png`. Los 11 originales nuevos están en `src/assets/*-original.png`; sus exportaciones para la web están en WebP. Las tres poses de Alafito conservan transparencia. Abre `ASSETS.html` para recorrer la biblioteca; `src/assets/assets.json` registra dimensiones y pesos. El archivo `docs/ASSETS-Y-PROMPTS.md` recoge los prompts y su procedencia. El plan está en `docs/PLAN-DE-REDISENO.md` y los resultados de las pruebas en `docs/VERIFICACION.md`.

La fuente Plus Jakarta Sans se distribuye con su licencia SIL OFL en `src/assets/OFL.txt` y `dist/assets/OFL.txt`.
