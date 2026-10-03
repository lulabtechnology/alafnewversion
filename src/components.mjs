export const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function icon(name, className = '') {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    book: '<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14"/>',
    chat: '<path d="M20 11a8 8 0 0 1-8 8H5l-4 3 2-7a8 8 0 1 1 17-4Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    heart: '<path d="M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6Z"/>',
    code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-13-2 14"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    leaf: '<path d="M20 3C8 3 3 6 3 12a7 7 0 0 0 7 7c6 0 9-5 10-16ZM3 21 15 9"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>'
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
}

export const button = (href, text, { secondary = false, external = false, className = '' } = {}) => `<a class="button ${secondary ? 'button-secondary' : 'button-primary'} ${className}" href="${escapeHTML(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(text)}${icon(external ? 'external' : 'arrow')}</a>`;

export function sectionTitle(eyebrow, title, description = '', className = '') {
  return `<div class="section-heading ${className}"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${description ? `<p class="section-description">${description}</p>` : ''}</div>`;
}

export function faq(items, id = 'faq') {
  return `<div class="faq-list" id="${id}">${items.map(([question, answer], index) => `<details class="faq-item"${index === 0 ? ' open' : ''}><summary><span>${question}</span>${icon('plus')}</summary><div class="faq-answer"><p>${answer}</p></div></details>`).join('')}</div>`;
}

export function cta(site, prefix = '', { title = 'Encuentra el programa<br>para el grado que buscas.', description = 'Indica el grado, modalidad y calendario. Admisiones te comparte horarios, costos y requisitos.' } = {}) {
  return `<div class="closing-art"><div class="container"><img src="${prefix}assets/mural-cierre.webp" width="1536" height="1024" loading="lazy" alt="Mural de papel recortado: libros, una casa, caminos y piezas de rompecabezas"></div></div><section class="cta-section"><div class="container cta-layout"><div><p class="eyebrow">ADMISIONES ALAF</p><h2>${title}</h2><p>${description}</p></div><div class="cta-actions">${button(`${prefix}admisiones/index.html#consulta`, 'Consultar admisiones')}${button(`https://wa.me/${site.admissions.number}`, 'Escribir por WhatsApp', { secondary: true, external: true })}</div></div></section>`;
}

export function contactForm(site, { compact = false } = {}) {
  return `<form class="contact-form ${compact ? 'is-compact' : ''}" method="post" data-contact-form data-transport="${escapeHTML(site.contact.transport)}" data-endpoint="${escapeHTML(site.contact.endpoint)}" data-whatsapp="${escapeHTML(site.admissions.number)}">
    <div class="form-heading"><p class="eyebrow">CONSULTA UN PROGRAMA</p><h3>Escribe a admisiones.</h3><p>${site.contact.transport === 'email' ? 'Completa tu consulta. Indica el grado y calendario en el mensaje.' : 'Prepara tu mensaje. Después podrás revisarlo y enviarlo en WhatsApp.'}</p></div>
    <div class="form-grid">
      <div class="field"><label for="contact-name">Tu nombre <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autocomplete="name" required minlength="2" maxlength="80" placeholder="Nombre del adulto responsable"></div>
      <div class="field"><label for="contact-email">Correo electrónico ${site.contact.transport === 'email' ? '<span aria-hidden="true">*</span>' : '(opcional)'}</label><input id="contact-email" name="email" type="email" autocomplete="email" ${site.contact.transport === 'email' ? 'required' : ''} maxlength="160" placeholder="tu@correo.com"></div>
      <div class="field"><label for="contact-phone">Teléfono</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="32" placeholder="Incluye el código de país"></div>
      <div class="field"><label for="contact-mode">Modalidad de interés <span aria-hidden="true">*</span></label><select id="contact-mode" name="mode" required><option value="">Selecciona una opción</option><option value="virtual">Virtual School</option><option value="homeschool">Homeschool acompañado</option><option value="orientacion">Quiero orientación</option></select></div>
      <div class="field field-full"><label for="contact-message">Tu consulta <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required minlength="10" maxlength="2000" rows="4" placeholder="Indica el grado, calendario y tus dudas sobre horarios, costos o requisitos."></textarea></div>
    </div>
    <div class="form-honeypot" aria-hidden="true"><label for="contact-website">Deja este campo vacío</label><input id="contact-website" name="website" autocomplete="off" tabindex="-1"></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>He leído la <a href="${compact ? '' : '../'}privacidad/index.html">información de privacidad</a> y acepto que ALAF use mis datos para atender esta consulta.</span></label>
    <button class="button button-primary form-submit" type="submit"><span data-submit-label>${site.contact.transport === 'email' ? 'Enviar consulta' : 'Preparar consulta por WhatsApp'}</span>${icon(site.contact.transport === 'email' ? 'mail' : 'arrow')}</button>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
    <div class="prepared-message" data-prepared hidden><p class="eyebrow">TU CONSULTA ESTÁ PREPARADA</p><p data-prepared-summary></p><a class="button button-primary" data-whatsapp-link target="_blank" rel="noopener noreferrer">Abrir WhatsApp y enviar ${icon('external')}</a><p class="form-note">Podrás revisar el mensaje en WhatsApp antes de enviarlo.</p></div>
    <noscript><p>Para consultar sin JavaScript, <a href="https://wa.me/${site.admissions.number}" target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a> o a <a href="mailto:${site.email}">${site.email}</a>.</p></noscript>
  </form>`;
}

export function header(site, prefix, active) {
  const links = [ ['modalidades', `${prefix}index.html#servicios`, 'Modalidades'], ['nosotros', `${prefix}nosotros/index.html`, 'Nosotros'], ['admisiones', `${prefix}admisiones/index.html`, 'Admisiones'] ];
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a><header class="site-header"><div class="container header-inner"><a class="brand" href="${prefix}index.html#inicio" aria-label="ALAF International Academy, inicio"><img src="${prefix}assets/logo.png" width="40" height="56" alt=""><span><strong>ALAF</strong><span>International Academy</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Abrir menú"><span class="menu-open-icon">${icon('menu')}</span><span class="menu-close-icon">${icon('close')}</span></button><nav class="primary-nav" id="primary-nav" aria-label="Navegación principal">${links.map(([key,href,label])=>`<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a class="campus-link" href="${site.campus}" target="_blank" rel="noopener noreferrer">${icon('book')} Campus virtual ${icon('external')}</a><a class="header-contact" href="${active === 'inicio' ? '#contacto' : `${prefix}admisiones/index.html#consulta`}">Admisiones ${icon('arrow')}</a></nav></div></header>`;
}

export function footer(site, prefix) {
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand"><a class="brand" href="${prefix}index.html"><img src="${prefix}assets/logo.png" width="40" height="56" alt=""><span><strong>ALAF</strong><span>International Academy</span></span></a><p>Virtual School y Homeschool.<br>Dos calendarios para elegir.</p><div class="brand-colors" aria-label="Colores de ALAF"><span></span><span></span><span></span></div></div><div><p class="footer-title">Descubre ALAF</p><a href="${prefix}virtual-school/index.html">Virtual School</a><a href="${prefix}homeschool/index.html">Homeschool acompañado</a><a href="${prefix}nosotros/index.html">Nuestra propuesta</a><a href="${prefix}admisiones/index.html">Admisiones</a><a href="${site.campus}" target="_blank" rel="noopener noreferrer">Campus virtual ↗</a></div><div><p class="footer-title">Estamos cerca</p><a href="https://wa.me/${site.attention.number}" target="_blank" rel="noopener noreferrer">Atención · ${site.attention.label}</a><a href="https://wa.me/${site.admissions.number}" target="_blank" rel="noopener noreferrer">Admisión · ${site.admissions.label}</a><a href="https://wa.me/${site.administration.number}" target="_blank" rel="noopener noreferrer">Administración · ${site.administration.label}</a><a class="footer-email" href="mailto:${site.email}">${site.email}</a><div class="social-links"><a href="${site.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="${site.tiktok}" target="_blank" rel="noopener noreferrer">TikTok ↗</a></div></div></div><div class="footer-bottom"><p>© ${new Date().getUTCFullYear()} ALAF International Academy</p><a href="${prefix}privacidad/index.html">Privacidad</a><p>Educación virtual y homeschool</p></div><p class="design-credit">Diseñado con mucho amor ${icon('heart')} por <a href="https://lulabtech.com" target="_blank" rel="noopener noreferrer">lulabtech.com</a></p></div></footer><a class="floating-contact" href="https://wa.me/${site.admissions.number}" target="_blank" rel="noopener noreferrer" aria-label="Consultar admisiones por WhatsApp">${icon('chat')}<span>Admisiones</span></a>`;
}

export function pageShell(site, page) {
  const { title, description, body, prefix = '', route = '/', active = 'inicio', noindex = false } = page;
  const canonical = `${site.url}${route}`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: site.name, url: site.url, logo: `${site.url}/assets/logo.png`, email: site.email, telephone: site.admissions.label, sameAs: [site.instagram, site.tiktok] };
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#ffffff"><title>${escapeHTML(title)} | ALAF International Academy</title><meta name="description" content="${escapeHTML(description)}">${noindex ? '<meta name="robots" content="noindex,follow">' : ''}<link rel="canonical" href="${canonical}"><link rel="icon" href="${prefix}assets/logo.png" type="image/png"><link rel="preload" href="${prefix}assets/jakarta-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${prefix}assets/styles.css"><script src="${prefix}assets/main.js" defer></script><meta property="og:type" content="website"><meta property="og:locale" content="es_PA"><meta property="og:site_name" content="${site.name}"><meta property="og:title" content="${escapeHTML(title)}"><meta property="og:description" content="${escapeHTML(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site.url}/assets/compartir-alaf.jpg"><meta property="og:image:width" content="1536"><meta property="og:image:height" content="1024"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script></head><body data-page="${active}">${header(site,prefix,active)}<main id="contenido">${body}</main>${footer(site,prefix)}</body></html>`;
}
