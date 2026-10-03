# Publicación y mantenimiento

## Hosting estático o cPanel

Sube el contenido de `dist/` al directorio público. Mantén las subcarpetas y los archivos ocultos, incluido `.htaccess` si el hosting usa Apache. Ese archivo configura el documento inicial y la página 404; no toca el subdominio del campus.

La página 404 utiliza rutas desde la raíz del dominio. Para publicar la web bajo una subcarpeta, ajusta las rutas de 404 y la configuración del hosting.

## Netlify con función opcional

Publica desde el proyecto completo utilizando `netlify.toml`. El comando de build es `npm run build`; la carpeta pública es `dist/`. La carpeta de funciones es `netlify/functions/`.

La función de contacto usa un `Request` estándar y el servicio de Resend por HTTPS. Consulta la configuración por correo en README.md. No habilites `contact.transport=email` en un hosting que no ejecute el endpoint.

## Seguridad de configuración

Las claves solo se guardan en variables de entorno del servidor. El paquete contiene únicamente `.env.example`, sin secretos. El endpoint valida origen, formato, longitud, consentimiento y honeypot; aplica un límite básico de intentos por instancia. Si hay abuso o tráfico elevado, configura una protección del hosting con límites persistentes.

`_headers` incluye una política de recursos locales para los hostings compatibles. No hay scripts de terceros, publicidad ni herramientas de seguimiento en el navegador.

## Cambios de contenido

1. Edita los textos en `src/pages/` y los contactos en `src/site.json`.
2. Ejecuta `npm run build`.
3. Ejecuta `npm run check`.
4. Revisa móvil y escritorio.
5. Publica el contenido actualizado de `dist/`.

La regeneración no borra archivos desconocidos de `dist/`. Si retiras una página o un recurso, elimina explícitamente su archivo generado y define la redirección adecuada antes de volver a publicar.

## Verificación de la entrega

Las pruebas de correo utilizan un proveedor simulado. No se enviaron mensajes a ALAF ni a otros destinatarios. Las pruebas locales no verifican la entrega real en un buzón.

La entrega incluye una comprobación de siete documentos HTML, recursos y enlaces locales, IDs y anclas antiguas. La revisión visual se realiza en el navegador en móvil, tablet y escritorio. Los resultados finales se registran en VERIFICACION.md.
