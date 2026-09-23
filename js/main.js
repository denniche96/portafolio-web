/* ==========================================================================
   main.js — Interactividad del portafolio
   Funcionalidades:
     1. Menú responsive (☰)
     2. Modo claro/oscuro con persistencia en localStorage
     3. Filtro de proyectos (proyectos.html)
     4. Validación del formulario de contacto (contacto.html)
   ========================================================================== */

'use strict';

/* ---------- 1. Menú responsive ---------- */
function initMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.getElementById('menu-principal');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
}

/* ---------- 2. Modo claro/oscuro ---------- */
function initTheme() {
  // TODO (paso 6): leer/guardar preferencia en localStorage y aplicar data-theme en <html>
}

/* ---------- 3. Filtro de proyectos ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter__button');
  const cards = document.querySelectorAll('.project-card');
  const status = document.querySelector('.filter__status');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visibles = 0;

      buttons.forEach((other) => {
        const isActive = other === button;
        other.classList.toggle('is-active', isActive);
        other.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'todos' || categories.includes(filter);
        card.hidden = !show;
        if (show) visibles++;
      });

      if (status) {
        status.textContent = `Mostrando ${visibles} de ${cards.length} proyectos`;
      }
    });
  });
}

/* ---------- 4. Validación del formulario ---------- */
const CONTACT_EMAIL = 'dennisse.cavero@gmail.com';

// Cada regla devuelve el mensaje de error, o '' si el valor es válido
const contactRules = {
  nombre(value) {
    if (!value) return 'Ingresa tu nombre.';
    if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    if (!/^[\p{L}\s'-]+$/u.test(value)) return 'El nombre solo puede contener letras y espacios.';
    return '';
  },
  correo(value) {
    if (!value) return 'Ingresa tu correo electrónico.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return 'Ingresa un correo válido, por ejemplo nombre@dominio.com.';
    }
    return '';
  },
  mensaje(value) {
    if (!value) return 'Escribe tu mensaje.';
    if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    return '';
  },
};

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Con JS activo usamos nuestros mensajes en lugar de los del navegador
  form.noValidate = true;
  const status = form.querySelector('.form__status');
  const fields = Object.keys(contactRules).map((name) => form.elements[name]);

  function validateField(field) {
    const message = contactRules[field.name](field.value.trim());
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent = message;
    return !message;
  }

  function showStatus(text, type) {
    status.textContent = text;
    status.className = `form__status form__status--${type}`;
  }

  fields.forEach((field) => {
    // Al salir del campo solo se valida si ya se escribió algo
    field.addEventListener('blur', () => {
      if (field.value.trim()) validateField(field);
    });
    // Si el campo tenía error, se revalida mientras se corrige
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      invalid[0].focus();
      showStatus('Revisa los campos marcados antes de enviar.', 'error');
      return;
    }

    // Sin servidor: se abre el cliente de correo con el mensaje ya redactado
    const [nombre, correo, mensaje] = fields.map((field) => field.value.trim());
    const subject = `Contacto desde el portafolio: ${nombre}`;
    const body = `${mensaje}\n\n${nombre}\n${correo}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showStatus('Todo correcto. Se abrirá tu aplicación de correo con el mensaje listo para enviar.', 'success');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initTheme();
  initProjectFilter();
  initContactForm();
});
