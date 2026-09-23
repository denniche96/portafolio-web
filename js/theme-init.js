/* ==========================================================================
   theme-init.js — Aplica el tema antes de que se pinte la página
   Se carga sin defer en el <head> para evitar el parpadeo del tema claro
   cuando la preferencia guardada es el modo oscuro.
   ========================================================================== */

(function () {
  let theme = null;

  try {
    theme = localStorage.getItem('theme');
  } catch (error) {
    // localStorage no disponible (modo privado estricto): se usa el sistema
  }

  // Sin preferencia guardada, se respeta la configuración del sistema
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
})();
