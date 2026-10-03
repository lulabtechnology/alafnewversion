# Plan de rediseño de ALAF

## Dirección implementada

Una web alegre con los colores del logo, mucho espacio blanco, titulares claros y un universo de collage de papel. Alafito aparece en tres poses coherentes; las ilustraciones conectan con estudiar desde casa, los proyectos, las finanzas y el campus. Los detalles de movimiento acompañan las piezas sin dificultar la lectura.

## Qué se rescata y qué se cambia

| Elemento | Decisión |
|---|---|
| Logo y Alafito | Conservar identidad y logo original; ampliar la biblioteca de la mascota. |
| Modalidades y calendarios | Mantener los datos publicados y explicar la rutina de cada modalidad. |
| Campus y contactos | Mantener sus destinos y darles accesos claros. |
| Propuesta académica | Recuperar áreas y recursos; explicar con ejemplos concretos. |
| Testimonio | Usar un extracto atribuido; revisar autorización antes de publicar. |
| Textos abstractos y repetidos | Reescribir y reducir; priorizar información útil para la familia. |
| Certificaciones, costos y disponibilidad | Confirmar con ALAF; evitar promesas o cifras no verificadas. |
| Fondos e imágenes anteriores | Sustituir por 11 piezas artísticas propias, con originales incluidos. |

## Tecnología

HTML, CSS y JavaScript estáticos, con un generador en Node.js. Sin dependencias de instalación ni servicios obligatorios para consultar la web. WebP, imágenes con carga diferida y fuente local. WhatsApp funciona desde la versión estática; el backend opcional por correo admite Node.js y Netlify con Resend configurado.

## Antes de publicar

1. Confirmar calendarios, horarios, requisitos, testimonio y privacidad con ALAF.
2. Respaldar la web existente y conservar el campus y sus registros DNS.
3. Publicar el contenido de `dist/`, manteniendo las subcarpetas y archivos de configuración.
4. Comprobar navegación y contactos en el dominio público. Si se activa correo, comprobar una entrega real.

Los detalles de identidad, contenidos, assets, publicación y pruebas están en los otros documentos de esta carpeta.
