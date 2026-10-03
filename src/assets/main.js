(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const mobile = window.matchMedia('(max-width:1100px)');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !nav) return;
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => { if (event.target.closest('a') && mobile.matches) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
  document.addEventListener('click', event => { if (mobile.matches && menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenu(false); });
  mobile.addEventListener('change', () => setMenu(false));

  const modeLabels = { virtual: 'Virtual School', homeschool: 'Homeschool acompañado', orientacion: 'Quiero orientación' };
  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const submit = form.querySelector('[type="submit"]');
    const status = form.querySelector('[data-form-status]');
    const prepared = form.querySelector('[data-prepared]');
    const summary = form.querySelector('[data-prepared-summary]');
    const whatsapp = form.querySelector('[data-whatsapp-link]');
    let busy = false;

    const notify = (message, error = false) => {
      status.textContent = message;
      status.classList.toggle('is-error', error);
      status.setAttribute('role', error ? 'alert' : 'status');
    };
    const resetPrepared = () => {
      prepared.hidden = true;
      whatsapp.removeAttribute('href');
      summary.textContent = '';
      if (!busy) notify('');
    };
    form.addEventListener('input', resetPrepared);
    form.addEventListener('change', resetPrepared);

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || !form.reportValidity()) return;
      const fields = Object.fromEntries(new FormData(form).entries());
      const data = {
        name: String(fields.name || '').trim(), email: String(fields.email || '').trim(),
        phone: String(fields.phone || '').trim(), mode: String(fields.mode || ''),
        message: String(fields.message || '').trim(), website: String(fields.website || '').trim(),
        consent: fields.consent === 'on'
      };
      if (data.website) { notify('No pudimos procesar la consulta. Puedes escribirnos por WhatsApp.', true); return; }
      if (data.name.length < 2 || data.message.length < 10 || !modeLabels[data.mode] || !data.consent) {
        notify('Completa tu nombre, modalidad, mensaje y consentimiento para continuar.', true);
        return;
      }
      const message = `Hola, ALAF. Quisiera información de admisión.\n\nNombre: ${data.name}${data.email ? `\nCorreo: ${data.email}` : ''}${data.phone ? `\nTeléfono: ${data.phone}` : ''}\nModalidad: ${modeLabels[data.mode]}\n\n${data.message}`;
      if (form.dataset.transport !== 'email') {
        summary.textContent = message;
        whatsapp.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
        prepared.hidden = false;
        notify('Tu consulta está preparada. Ábrela en WhatsApp para revisarla y enviarla.');
        prepared.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
        return;
      }
      busy = true;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      notify('Enviando tu consulta…');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
        let result;
        try { result = await response.json(); } catch { throw new Error('No pudimos confirmar el envío. Escríbenos por WhatsApp o correo.'); }
        if (!response.ok || result.ok !== true) throw new Error(result.message || 'No pudimos entregar tu consulta. Intenta por WhatsApp.');
        form.reset();
        prepared.hidden = true;
        notify('Tu consulta fue entregada al servicio de correo. Gracias por contactar a ALAF.');
      } catch (error) {
        notify(error.name === 'AbortError' ? 'El envío tardó demasiado. Tus datos siguen en el formulario; puedes contactar por WhatsApp.' : error.message, true);
      } finally {
        clearTimeout(timeout);
        busy = false;
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    });
  });
})();
