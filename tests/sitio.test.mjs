// Un código de: Joseph Ubaldo Trejo Hernández
// Pruebas del sitio construido (correr después de "npm run build").
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('../dist/', import.meta.url);
// En GitHub Pages el sitio vive en una subcarpeta; las pruebas la quitan para buscar los archivos en dist/.
const base = (process.env.BASE_PATH || '').replace(/\/+$/, '').replace(/^(?!\/)(?=.)/, '/');
const sinBase = (href) => (base && href.startsWith(`${base}/`) ? href.slice(base.length) : href);
const datos = JSON.parse(readFileSync(new URL('../src/datos/jalisco.json', import.meta.url), 'utf8'));
const manifiesto = JSON.parse(readFileSync(new URL('../src/datos/lanzamientos.json', import.meta.url), 'utf8'));
const leer = (ruta) => readFileSync(new URL(ruta, raiz), 'utf8');
const nf = (v, d = 0) => new Intl.NumberFormat('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#34;/g, '"')
    .replace(/[ \t\r\n ]+/g, ' ');

function paginas(dir = raiz.pathname, lista = []) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) paginas(ruta, lista);
    else if (nombre.endsWith('.html')) lista.push(ruta.slice(raiz.pathname.length));
  }
  return lista;
}

const todas = paginas();
const jalisco = leer('jalisco/index.html');
const inicio = leer('index.html');

test('se construyen todas las páginas y ninguna de lo que se quitó', () => {
  for (const ruta of ['index.html', 'producto/index.html', 'como-usar/index.html', 'jalisco/index.html', 'jalisco/metodologia/index.html',
    'nosotros/index.html', 'descargas/index.html', 'contacto/index.html', 'privacidad/index.html', 'terminos/index.html', '404.html']) {
    assert.ok(todas.includes(ruta), ruta);
  }
  assert.ok(!todas.some((r) => r.startsWith('mi-cuenta')));
});

test('no quedan cuenta, asistente, Firebase ni versión web', () => {
  for (const ruta of todas) {
    const t = texto(leer(ruta));
    for (const prohibido of [/Mi cuenta/, /asistente con IA|Preguntar al asistente/i, /firebase/i, /app\.polisafe\.app/, /iniciar sesión/i]) {
      assert.ok(!prohibido.test(t) && !prohibido.test(leer(ruta).replace(/<[^>]+>/g, ' ')), `${ruta}: ${prohibido}`);
    }
  }
});

test('las cifras de Jalisco coinciden con los datos del pipeline', () => {
  const r = datos.resumen;
  for (const html of [jalisco, inicio]) {
    const t = texto(html);
    assert.ok(t.includes(nf(Math.round(r.defunciones_cronicas_promedio_anual))));
    assert.ok(t.includes(nf(r.unidades_publicas_primer_nivel)));
    assert.ok(t.includes(`${nf(r.pct_cronicas_menores_60, 1)} %`));
  }
  const t = texto(jalisco);
  assert.ok(t.includes(`${nf(r.pct_poblacion_mas_10km, 2)} %`));
  assert.ok(t.includes(nf(r.personas_mas_10km)));
  assert.ok(t.includes(`${nf(r.pct_cronicas_del_total, 1)} %`));
});

test('la tabla trae los 125 municipios, el mapa todas las unidades y cada causa su valor', () => {
  const tabla = jalisco.split('id="tabla-municipios"')[1].split('</table>')[0];
  assert.equal((tabla.match(/<tr data-nombre=/g) || []).length, 125);
  assert.equal((jalisco.match(/<circle /g) || []).length, datos.unidades.length);
  for (const m of datos.municipios) assert.ok(jalisco.includes(`>${m.nombre}</th>`), m.nombre);
  for (const c of datos.causas) {
    assert.ok(jalisco.includes(c.nombre), c.nombre);
    assert.ok(jalisco.includes(`>${nf(Math.round(c.promedio_anual))}</span>`), c.nombre);
  }
});

test('los datos abiertos existen y coinciden con los de la página', () => {
  const filas = (archivo) => readFileSync(new URL(`datos/${archivo}`, raiz), 'utf8').trim().split('\n').length - 1;
  assert.equal(filas('municipios_jalisco.csv'), datos.municipios.length);
  assert.equal(filas('causas_cronicas_jalisco.csv'), datos.causas.length);
  assert.equal(filas('jurisdicciones_jalisco.csv'), datos.jurisdicciones.length);
  assert.equal(filas('unidades_primer_nivel_jalisco.csv'), datos.unidades.length);
  assert.deepEqual(JSON.parse(readFileSync(new URL('datos/resumen_estatal.json', raiz), 'utf8')), datos.resumen);
  assert.ok(jalisco.includes('id="datos-abiertos"'));
});

test('se citan los datasets 12, 13 y 17 del catálogo del reto', () => {
  const metodologia = leer('jalisco/metodologia/index.html');
  for (const id of ['12', '13', '17']) assert.ok(metodologia.includes(`>${id}</th>`), id);
  assert.ok(texto(jalisco).includes('datasets 12'));
});

test('el botón de descarga apunta al APK del manifiesto', () => {
  const android = manifiesto.lanzamientos.find((l) => l.plataforma === 'android' && l.estado === 'disponible');
  assert.ok(leer('descargas/index.html').includes(`href="${base}${android.url}"`));
  assert.ok(inicio.includes(`href="${base}${android.url}"`));
  assert.ok(texto(leer('descargas/index.html')).includes(android.sha256));
});

test('los enlaces internos llevan a algo que existe', () => {
  for (const ruta of todas) {
    const html = leer(ruta);
    for (const [, original] of html.matchAll(/href="([^"]+)"/g)) {
      if (ruta.startsWith('app/') && !original.startsWith('/')) continue; // la versión web usa rutas relativas a su <base>
      const href = sinBase(original);
      if (base && href.startsWith('/') && !href.startsWith('//') && href === original && !href.startsWith(base)) {
        assert.fail(`${ruta}: ${original} no lleva la subcarpeta ${base}`);
      }
      if (href.startsWith('#')) {
        assert.ok(html.includes(`id="${href.slice(1)}"`), `${ruta}: ${href}`);
      } else if (href.startsWith('/') && !href.startsWith('//')) {
        const [camino, ancla] = href.split('#');
        const destino = camino.endsWith('/') ? `${camino.slice(1)}index.html` : camino.slice(1);
        const existe = existsSync(new URL(destino, raiz)) || (camino.startsWith('/descargas/archivos/') && existsSync(new URL(`../public${camino}`, import.meta.url)));
        assert.ok(existe, `${ruta}: ${href}`);
        if (ancla) assert.ok(leer(destino).includes(`id="${ancla}"`), `${ruta}: ${href}`);
      }
    }
  }
});

test('sin emojis ni exclamaciones, y con el aviso de que no es diagnóstico', () => {
  const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
  for (const ruta of todas) {
    const t = texto(leer(ruta));
    assert.ok(!emoji.test(t), ruta);
    assert.ok(!/[¡!]/.test(t.replace(/<!doctype/i, '')), ruta);
  }
  assert.ok(texto(jalisco).includes('No es un diagnóstico'));
  assert.ok(texto(inicio).includes('No diagnostica'));
});

test('no carga recursos de terceros ni rastreo; los enlaces externos son a fuentes oficiales', () => {
  const permitidos = ['www.inegi.org.mx', 'www.gob.mx'];
  for (const ruta of todas) {
    const html = leer(ruta);
    for (const [, src] of html.matchAll(/\ssrc="(https?:[^"]+)"/g)) assert.fail(`${ruta}: recurso externo ${src}`);
    for (const [etiqueta] of html.matchAll(/<link[^>]+>/g)) {
      if (/rel="(canonical|sitemap)"/.test(etiqueta)) continue;
      const externo = etiqueta.match(/href="(https?:[^"]+)"/);
      if (externo) assert.fail(`${ruta}: recurso externo ${externo[1]}`);
    }
    for (const [, href] of html.matchAll(/<a[^>]+href="(https?:[^"]+)"/g)) {
      assert.ok(permitidos.includes(new URL(href).hostname), `${ruta}: ${href}`);
    }
    assert.ok(!/analytics|gtag|googletagmanager/i.test(html), ruta);
  }
});

test('ningún archivo del repositorio pasa el límite de 100 MB de GitHub', () => {
  const limite = 100 * 1024 * 1024;
  const revisar = (dir) => {
    for (const nombre of readdirSync(dir)) {
      if (['node_modules', 'dist', '.astro', '.git'].includes(nombre)) continue;
      const ruta = join(dir, nombre);
      const info = statSync(ruta);
      if (info.isDirectory()) revisar(ruta);
      else assert.ok(info.size < limite, `${ruta} pesa ${Math.round(info.size / 1e6)} MB`);
    }
  };
  revisar(new URL('..', import.meta.url).pathname);
});
