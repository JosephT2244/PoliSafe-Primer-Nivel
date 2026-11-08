// Un código de: Joseph Ubaldo Trejo Hernández
// Enlaces del sitio cuando se publica en una subcarpeta (GitHub Pages).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { conBase, normalizarBase } from '../src/lib/despliegue.mjs';

test('la subcarpeta se normaliza sin importar las diagonales', () => {
  assert.equal(normalizarBase('/PoliSafe-Primer-Nivel'), '/PoliSafe-Primer-Nivel');
  assert.equal(normalizarBase('PoliSafe-Primer-Nivel/'), '/PoliSafe-Primer-Nivel');
  assert.equal(normalizarBase(''), '');
  assert.equal(normalizarBase('/'), '');
  assert.equal(normalizarBase(undefined), '');
});

test('los enlaces desde la raíz se mueven a la subcarpeta y los demás no cambian', () => {
  const b = '/PoliSafe-Primer-Nivel';
  const html =
    '<a href="/">Inicio</a><a href="/producto/">P</a><a href="/jalisco/#datos-abiertos">J</a>' +
    '<img src="/PoliSafe-Primer-Nivel/recursos/x.png"><a href="https://www.inegi.org.mx/">I</a>' +
    '<a href="#contenido">S</a><a href="mailto:polisafe@polisafe.app">C</a><script src="//cdn.ejemplo/a.js"></script>' +
    '<base href="/app/"><a href="/descargas/archivos/a.apk" download>A</a><link rel="manifest" href="manifest.json">';
  const esperado =
    '<a href="/PoliSafe-Primer-Nivel/">Inicio</a><a href="/PoliSafe-Primer-Nivel/producto/">P</a>' +
    '<a href="/PoliSafe-Primer-Nivel/jalisco/#datos-abiertos">J</a><img src="/PoliSafe-Primer-Nivel/recursos/x.png">' +
    '<a href="https://www.inegi.org.mx/">I</a><a href="#contenido">S</a><a href="mailto:polisafe@polisafe.app">C</a>' +
    '<script src="//cdn.ejemplo/a.js"></script><base href="/PoliSafe-Primer-Nivel/app/">' +
    '<a href="/PoliSafe-Primer-Nivel/descargas/archivos/a.apk" download>A</a><link rel="manifest" href="manifest.json">';
  assert.equal(conBase(html, b), esperado);
  assert.equal(conBase(esperado, b), esperado, 'aplicarlo dos veces no duplica la subcarpeta');
});

test('sin subcarpeta el HTML queda igual', () => {
  assert.equal(conBase('<a href="/producto/">P</a>', ''), '<a href="/producto/">P</a>');
});
