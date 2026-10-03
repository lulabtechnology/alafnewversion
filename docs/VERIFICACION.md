# Verificación de la entrega

Revisión local: 3 de octubre de 2026.

## Web y enlaces

- Generación correcta de siete documentos HTML: Inicio, Virtual School, Homeschool, Nosotros, Admisiones, Privacidad y 404.
- Comprobación de 176 referencias locales, archivos, IDs únicos y anclas antiguas.
- Destinos conservados para campus, los tres números de WhatsApp, correo, Instagram y TikTok.
- Firma «Diseñado con mucho amor por lulabtech.com» presente en todas las páginas, con enlace a LulabTech.

## Responsive y comportamiento

Las siete páginas se revisaron en el navegador a 320, 768 y 1440 px: 21 combinaciones sin desbordamiento horizontal. La portada también se inspeccionó a 390 px.

El menú móvil abre y cierra; Escape lo cierra y devuelve el foco al botón. La firma se comprobó nuevamente a 320 px después de reservar espacio para el acceso flotante a WhatsApp. No queda tapada.

Se comprobó en navegador la preparación de una consulta ficticia, con nombre, modalidad y mensaje, sin correo opcional. El enlace utiliza el número de admisiones 50767104100 y el texto codificado correspondiente. Al editar el mensaje se oculta la vista preparada y se retira el enlace anterior. No se envió el mensaje ni se abrió WhatsApp.

Las animaciones utilizan transformaciones y opacidad. La hoja de estilos desactiva animaciones, transiciones y desplazamiento suave cuando el navegador solicita `prefers-reduced-motion: reduce`.

## Contacto opcional por correo

Seis pruebas automatizadas con proveedor simulado comprueban: validación y consentimiento, rechazo de origen incorrecto, configuración incompleta, confirmación del proveedor, fallo de envío y límite de intentos por IP. No hubo envíos reales. El modo entregado es WhatsApp.

## Assets y portabilidad

La biblioteca contiene 11 PNG originales y 11 exportaciones WebP. Las tres poses de Alafito conservan transparencia. El logo oficial se mantiene como archivo independiente y sin modificaciones. La fuente se incluye localmente junto con su licencia.

El paquete se extrae y vuelve a generar con Node.js sin instalar dependencias. Incluye la versión ya generada en `dist/`, `ABRIR-WEB.html`, `ASSETS.html` y capturas en `preview/`.

## Alcance

No se publicó ni se reemplazó la web pública. La entrega real por correo necesita configuración y una prueba con un destinatario autorizado. Los datos operativos y la privacidad pendientes de revisión editorial están identificados en `CONTENIDO.md`.
