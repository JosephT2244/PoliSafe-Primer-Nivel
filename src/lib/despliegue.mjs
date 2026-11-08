// Un código de: Joseph Ubaldo Trejo Hernández
// Dónde se publica el sitio. En GitHub Pages el sitio vive en una subcarpeta
// (https://josepht2244.github.io/PoliSafe-Primer-Nivel/); el flujo de publicación pasa
// SITIO_URL y BASE_PATH. Sin ellas el sitio se construye para la raíz de un dominio.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Subcarpeta sin diagonal final ('' si el sitio va en la raíz). */
export function normalizarBase(valor) {
  const limpio = String(valor || '').trim().replace(/^\/+|\/+$/g, '');
  return limpio ? `/${limpio}` : '';
}

export const base = normalizarBase(process.env.BASE_PATH);
export const sitioUrl = process.env.SITIO_URL || undefined;

/**
 * Agrega la subcarpeta a los enlaces que empiezan en la raíz (href, src y action),
 * incluida la etiqueta <base> de la versión web. Respeta los que ya la traen,
 * los externos, los de protocolo relativo y las anclas.
 */
export function conBase(html, prefijo = base) {
  if (!prefijo) return html;
  return html.replace(/(\s(?:href|src|action)=")(\/(?!\/)[^"]*)"/g, (todo, atributo, ruta) =>
    ruta === prefijo || ruta.startsWith(`${prefijo}/`) ? todo : `${atributo}${prefijo}${ruta}"`,
  );
}

async function listarHtml(dir) {
  const salida = [];
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) salida.push(...(await listarHtml(ruta)));
    else if (entrada.name.endsWith('.html')) salida.push(ruta);
  }
  return salida;
}

/** Integración de Astro: al terminar el build, ajusta los enlaces de todas las páginas a la subcarpeta. */
export function rutasConBase() {
  return {
    name: 'rutas-con-base',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!base) return;
        for (const archivo of await listarHtml(fileURLToPath(dir))) {
          const html = await readFile(archivo, 'utf8');
          const nuevo = conBase(html);
          if (nuevo !== html) await writeFile(archivo, nuevo);
        }
      },
    },
  };
}
