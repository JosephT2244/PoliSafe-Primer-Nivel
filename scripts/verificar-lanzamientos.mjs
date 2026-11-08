// Un código de: Joseph Ubaldo Trejo Hernández
// Detiene el build si el manifiesto de lanzamientos no es válido o si el APK publicado no coincide con él.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { erroresManifiesto, lanzamientosDisponibles } from '../src/lib/lanzamientos.mjs';

const manifiesto = JSON.parse(readFileSync(new URL('../src/datos/lanzamientos.json', import.meta.url), 'utf8'));
const errores = [...erroresManifiesto(manifiesto)];
const avisos = [];
for (const item of manifiesto.lanzamientos.filter((l) => l.estado === 'disponible' && l.url?.startsWith('/'))) {
  const ruta = new URL(`../public${item.url}`, import.meta.url);
  if (!existsSync(ruta)) {
    avisos.push(`Falta public${item.url}: cópialo desde entregables antes de publicar el sitio.`);
    continue;
  }
  if (statSync(ruta).size !== item.tamanoBytes) errores.push(`${item.archivo}: el tamaño no coincide con el manifiesto.`);
  const sha = createHash('sha256').update(readFileSync(ruta)).digest('hex');
  if (sha !== item.sha256) errores.push(`${item.archivo}: el SHA-256 no coincide con el manifiesto.`);
}
if (avisos.length) process.stdout.write(`${avisos.join('\n')}\n`);
if (errores.length) {
  process.stderr.write(`${errores.join('\n')}\n`);
  process.exitCode = 1;
} else {
  const n = ['android'].map((p) => lanzamientosDisponibles(manifiesto, p).length).reduce((a, b) => a + b, 0);
  process.stdout.write(`Manifiesto válido: ${n} lanzamiento disponible.\n`);
}
