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
  // TODO (paso 6): filtrar las cards de proyecto según el botón activo
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
