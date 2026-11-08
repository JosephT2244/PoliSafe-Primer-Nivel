// Un código de: Joseph Ubaldo Trejo Hernández
// Copia el SHA-256 al portapapeles y confirma con texto (no solo con color).
for (const boton of document.querySelectorAll<HTMLButtonElement>('[data-copiar]')) {
  boton.addEventListener('click', async () => {
    const etiqueta = boton.querySelector<HTMLElement>('[data-copiar-texto]');
    try {
      await navigator.clipboard.writeText(boton.dataset.copiar ?? '');
      if (etiqueta) etiqueta.textContent = 'Copiado';
    } catch {
      if (etiqueta) etiqueta.textContent = 'Selecciona y copia';
    }
    window.setTimeout(() => {
      if (etiqueta) etiqueta.textContent = 'Copiar';
    }, 2400);
  });
}

export {};
