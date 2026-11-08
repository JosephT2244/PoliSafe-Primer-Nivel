// Un código de: Joseph Ubaldo Trejo Hernández
// Recorrido de la portada: cambia la pantalla del teléfono cada cierto tiempo.
// Se detiene al pasar el puntero, al enfocar con teclado o si la pestaña no está visible.
// Con "reducir movimiento" no avanza solo; los botones siguen funcionando.
const raiz = document.querySelector<HTMLElement>('[data-recorrido]');
const botones = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-paso]'));
const pantallas = Array.from(document.querySelectorAll<HTMLElement>('[data-pantalla]'));
const DURACION = 5200;
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let actual = 0;
let temporizador: number | undefined;

function mostrar(indice: number) {
  actual = (indice + botones.length) % botones.length;
  const id = botones[actual].dataset.paso;
  botones.forEach((b, i) => b.setAttribute('aria-pressed', String(i === actual)));
  for (const p of pantallas) {
    const activa = p.dataset.pantalla === id;
    p.classList.toggle('activa', activa);
    if (activa) p.removeAttribute('aria-hidden');
    else p.setAttribute('aria-hidden', 'true');
    // La imagen dentro de <picture> carga diferida: se pide antes de mostrarla.
    if (activa && p instanceof HTMLImageElement) p.loading = 'eager';
  }
  // Reinicia la animación de la barra de progreso.
  const barra = botones[actual].querySelector<HTMLElement>('.progreso');
  if (barra) {
    barra.style.display = 'none';
    void barra.offsetWidth;
    barra.style.display = '';
  }
}

function detener() {
  window.clearInterval(temporizador);
  temporizador = undefined;
  raiz?.classList.remove('reproduciendo');
}

function reproducir() {
  if (reducir || temporizador || document.hidden) return;
  raiz?.classList.add('reproduciendo');
  raiz?.style.setProperty('--duracion', `${DURACION}ms`);
  temporizador = window.setInterval(() => mostrar(actual + 1), DURACION);
  mostrar(actual);
}

botones.forEach((b, i) =>
  b.addEventListener('click', () => {
    detener();
    mostrar(i);
  }),
);

if (raiz && botones.length) {
  // Precarga las demás pantallas cuando el navegador esté libre.
  const precargar = () => {
    for (const p of pantallas) if (p instanceof HTMLImageElement) p.loading = 'eager';
  };
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(precargar, { timeout: 2500 });
  else window.setTimeout(precargar, 1500);

  raiz.addEventListener('pointerenter', detener);
  raiz.addEventListener('pointerleave', reproducir);
  raiz.addEventListener('focusin', detener);
  document.addEventListener('visibilitychange', () => (document.hidden ? detener() : reproducir()));
  window.setTimeout(reproducir, 1600);
}

export {};
