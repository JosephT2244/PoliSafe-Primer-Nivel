// Un código de: Joseph Ubaldo Trejo Hernández
// Aparición al hacer scroll con IntersectionObserver (sin escuchar el evento scroll)
// y estado del encabezado. Lo que ya está en pantalla al cargar no se anima.
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elementos = Array.from(document.querySelectorAll<HTMLElement>('[data-revelar]'));

if (!reducir && 'IntersectionObserver' in window) {
  const alto = window.innerHeight;
  for (const el of elementos) {
    if (el.getBoundingClientRect().top < alto * 0.92) el.classList.add('visible');
  }
  document.documentElement.classList.add('js');
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  for (const el of elementos) if (!el.classList.contains('visible')) observador.observe(el);
}

const encabezado = document.querySelector<HTMLElement>('[data-encabezado]');
const centinela = document.createElement('div');
centinela.setAttribute('aria-hidden', 'true');
centinela.style.cssText = 'position:absolute;top:0;height:8px;width:1px;pointer-events:none';
document.body.prepend(centinela);
new IntersectionObserver(([entrada]) => {
  encabezado?.classList.toggle('desplazado', !entrada.isIntersecting);
}).observe(centinela);

export {};
