// Un código de: Joseph Ubaldo Trejo Hernández
// Menú móvil accesible: botón con aria-expanded, cierre con Escape y al elegir un enlace.
const boton = document.querySelector<HTMLButtonElement>('[data-menu-boton]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

function abrir(abierto: boolean) {
  if (!boton || !menu) return;
  boton.setAttribute('aria-expanded', String(abierto));
  boton.querySelector('.solo-lector')!.textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
  menu.hidden = !abierto;
  document.documentElement.style.overflow = abierto ? 'hidden' : '';
  if (abierto) menu.querySelector<HTMLAnchorElement>('a')?.focus();
}

boton?.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (evento) => {
  if ((evento.target as HTMLElement).closest('a')) abrir(false);
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && boton?.getAttribute('aria-expanded') === 'true') {
    abrir(false);
    boton.focus();
  }
});
window.matchMedia('(min-width: 921px)').addEventListener('change', (consulta) => {
  if (consulta.matches) abrir(false);
});

export {};
