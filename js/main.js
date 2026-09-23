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
function initContactForm() {
  // TODO (paso 6): validar nombre, correo y mensaje y mostrar errores claros
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initTheme();
  initProjectFilter();
  initContactForm();
});
