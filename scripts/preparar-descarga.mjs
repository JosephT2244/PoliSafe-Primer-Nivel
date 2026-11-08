// Un código de: Joseph Ubaldo Trejo Hernández
// Antes de compilar el sitio copia el APK vigente de ../entregables/ a public/descargas/archivos/
// y la versión web (../app/build/web o ../entregables/web) a public/app/.
// Ni el APK ni la versión web se guardan dos veces: se copian solo al publicar.
import { readFileSync, existsSync, mkdirSync, copyFileSync, cpSync } from 'node:fs';
import { vigente } from '../src/lib/lanzamientos.mjs';

const manifiesto = JSON.parse(readFileSync(new URL('../src/datos/lanzamientos.json', import.meta.url), 'utf8'));
const android = vigente(manifiesto, 'android');
if (android) {
  const destino = new URL(`../public${android.url}`, import.meta.url);
  const origen = new URL(`../../entregables/${android.archivo}`, import.meta.url);
  if (existsSync(destino)) {
    process.stdout.write(`Ya está public${android.url}.\n`);
  } else if (existsSync(origen)) {
    mkdirSync(new URL('.', destino), { recursive: true });
    copyFileSync(origen, destino);
    process.stdout.write(`Copiado ${android.archivo} desde entregables.\n`);
  } else {
    process.stdout.write(`No se encontró ${android.archivo} en entregables; la descarga no funcionará hasta copiarlo.\n`);
  }
}

const web = new URL('../public/app/', import.meta.url);
const fuentesWeb = ['../../app/build/web/', '../../entregables/web/'].map((r) => new URL(r, import.meta.url));
const origenWeb = fuentesWeb.find((u) => existsSync(new URL('index.html', u)));
if (existsSync(new URL('index.html', web))) {
  process.stdout.write('Ya está public/app/.\n');
} else if (origenWeb) {
  cpSync(origenWeb, web, { recursive: true });
  process.stdout.write(`Copiada la versión web desde ${origenWeb.pathname}.\n`);
} else {
  process.stdout.write('No se encontró la versión web; compílala con flutter build web --release --base-href /app/ --no-web-resources-cdn.\n');
}
