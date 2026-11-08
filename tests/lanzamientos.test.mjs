// Un código de: Joseph Ubaldo Trejo Hernández
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { erroresManifiesto, lanzamientosDisponibles, urlDirectaAprobada, vigente } from '../src/lib/lanzamientos.mjs';

const base = '/descargas/archivos/';
const apk = {
  id: 'android-1-0-0', plataforma: 'android', canal: 'apk', estado: 'disponible',
  version: '1.0.0', build: 1, fecha: '2026-09-27', requisitos: 'Android 7.0 o posterior',
  notas: 'Primera versión', archivo: 'PoliSafe-1.0.0-android.apk', url: `${base}PoliSafe-1.0.0-android.apk`,
  tamanoBytes: 120000000, sha256: 'a'.repeat(64),
};
const zip = { ...apk, id: 'windows-1-0-0', plataforma: 'windows', canal: 'zip-windows', archivo: 'PoliSafe-1.0.0-windows-x64.zip', url: `${base}PoliSafe-1.0.0-windows-x64.zip` };
const manifiesto = (items) => ({ esquema: 2, actualizadoEn: '2026-10-02', lanzamientos: items });

test('el manifiesto publicado es válido', () => {
  const real = JSON.parse(readFileSync(new URL('../src/datos/lanzamientos.json', import.meta.url), 'utf8'));
  assert.deepEqual(erroresManifiesto(real), []);
});

test('un manifiesto vacío y descargas verificadas son válidos', () => {
  assert.deepEqual(erroresManifiesto(manifiesto([])), []);
  assert.deepEqual(erroresManifiesto(manifiesto([apk, zip])), []);
  assert.ok(erroresManifiesto({ ...manifiesto([]), actualizadoEn: '2026-02-31' }).length);
  assert.ok(erroresManifiesto({ ...manifiesto([]), esquema: 1 }).length);
});

test('solo se aceptan archivos publicados en la carpeta de descargas del propio sitio', () => {
  assert.ok(urlDirectaAprobada(`${base}a.apk`));
  assert.ok(!urlDirectaAprobada('https://github.com/otra-cuenta/Polisafe/releases/download/v1/a.apk'));
  assert.ok(!urlDirectaAprobada('/otra-carpeta/a.apk'));
  assert.ok(!urlDirectaAprobada(`${base}../a.apk`));
  assert.ok(!urlDirectaAprobada(`${base}a.apk?v=2`));
  assert.ok(!urlDirectaAprobada(null));
});

test('el APK publicado coincide con el tamaño y el SHA-256 del manifiesto', () => {
  const real = JSON.parse(readFileSync(new URL('../src/datos/lanzamientos.json', import.meta.url), 'utf8'));
  const android = vigente(real, 'android');
  assert.ok(android, 'falta el lanzamiento de Android');
  const ruta = new URL(`../public${android.url}`, import.meta.url);
  // El APK no se versiona con el código; si no está, la prueba lo dice pero no inventa datos.
  if (!existsSync(ruta)) return;
  assert.equal(statSync(ruta).size, android.tamanoBytes);
  assert.equal(createHash('sha256').update(readFileSync(ruta)).digest('hex'), android.sha256);
});

test('se rechazan enlaces fuera del sitio, hashes ausentes, nombres incoherentes y canales incorrectos', () => {
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, url: `http://polisafe.app/${apk.archivo}` }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, url: `/otra/${apk.archivo}` }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, sha256: '' }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, sha256: 'A'.repeat(64) }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, archivo: 'PoliSafe.exe' }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...apk, plataforma: 'ios' }])).length);
  assert.ok(erroresManifiesto(manifiesto([{ ...zip, archivo: 'polisafe.exe', url: `${base}polisafe.exe` }])).length);
});

test('un lanzamiento retirado no conserva enlace de descarga', () => {
  const retirado = { ...apk, estado: 'retirado', motivoRetiro: 'Versión reemplazada.' };
  assert.ok(erroresManifiesto(manifiesto([retirado])).length);
  assert.deepEqual(erroresManifiesto(manifiesto([{ ...retirado, url: null }])), []);
});

test('se ordenan solo las versiones disponibles de cada plataforma', () => {
  const anterior = { ...apk, id: 'android-0-9-0', version: '0.9.0', fecha: '2026-08-01' };
  const retirado = { ...anterior, id: 'android-0-8-0', estado: 'retirado', url: null, motivoRetiro: 'Reemplazado.' };
  assert.deepEqual(lanzamientosDisponibles(manifiesto([anterior, apk, retirado]), 'android').map((v) => v.id), [
    'android-1-0-0', 'android-0-9-0',
  ]);
});
