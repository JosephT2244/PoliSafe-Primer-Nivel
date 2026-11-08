# Sitio de PoliSafe Primer Nivel

Sitio estático (Astro 7) que presenta la app, la promueve y, en **Jalisco en datos**, muestra con datos oficiales por qué hace falta en Jalisco, con los archivos abiertos para revisarlos. Usa el mismo diseño, componentes y estilos que el sitio de PoliSafe, sin cuenta, asistente, Firebase ni versión web.

## Comandos (desde esta carpeta)

| Acción | Comando |
|---|---|
| Instalar dependencias | `npm install` |
| Servidor local | `npm run dev` |
| Compilar (copia el APK, valida el manifiesto y construye) | `npm run build` |
| Pruebas (manifiesto y sitio construido) | `npm test` (después de `npm run build`) |
| Revisión de tipos | `npm run check` |
| Construir para otro dominio | `SITIO_URL=https://tu-dominio npm run build` (raíz) o con `BASE_PATH=/subcarpeta` |

Sin `SITIO_URL` el sitio no genera enlaces absolutos ni sitemap; con ella agrega la URL canónica, `og:url` y `sitemap-index.xml`.

## Publicar en GitHub Pages

Sitio: **https://josepht2244.github.io/PoliSafe-Primer-Nivel/**

1. Una sola vez, en GitHub: *Settings > Pages > Build and deployment > Source: GitHub Actions*.
2. Cada push a `main` corre `.github/workflows/pages.yml`: instala, construye con la subcarpeta del repositorio (`BASE_PATH`) y el dominio (`SITIO_URL`), corre las pruebas y publica `dist/`. Si una prueba falla, no se publica.

El repositorio trae todo lo necesario, incluidos el APK (`public/descargas/archivos/`) y la versión web (`public/app/`). Las páginas se escriben con rutas desde la raíz (`/jalisco/`); al construir para GitHub Pages, `src/lib/despliegue.mjs` les agrega la subcarpeta, también a la etiqueta `<base>` de la versión web. Para probarlo igual que en GitHub: `BASE_PATH=/PoliSafe-Primer-Nivel SITIO_URL=https://josepht2244.github.io npm run build` y luego `BASE_PATH=/PoliSafe-Primer-Nivel npm test`.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada: qué es la app, recorrido con capturas, cifras de Jalisco, módulos, seguimiento en cuatro pasos, por qué en Jalisco, privacidad, descarga, equipo y preguntas |
| `/producto/` | Los nueve módulos con sus funciones y capturas |
| `/como-usar/` | Guía paso a paso |
| `/jalisco/` | Jalisco en datos: cifras, causas, de los datos a la app, 125 municipios, red de unidades y **datos abiertos** |
| `/jalisco/metodologia/` | Fuentes, definiciones, límites y cómo decide la app |
| `/descargas/` | APK con versión, tamaño, SHA-256, permisos y notas |
| `/nosotros/`, `/contacto/`, `/privacidad/`, `/terminos/`, `404` | Equipo, contacto y textos legales |

## Dónde está cada cosa

| Ruta | Contenido |
|---|---|
| `src/datos/` | Contenido editable: `sitio.ts` (cifras), `modulos.ts`, `guia.ts`, `preguntas.ts`, `empresa.ts`, `lanzamientos.json` y `jalisco.json` (lo genera `datos/scripts/pipeline.py`) |
| `public/datos/` | Archivos abiertos (CSV y JSON) que también genera el pipeline |
| `src/assets/capturas/` | Capturas reales de la app con datos de demostración ficticios |
| `src/styles/global.css` y `src/styles/datos.css` | Tokens y estilos del sitio de PoliSafe; estilos de gráficas y tablas de Jalisco |
| `public/app/` | Versión web de la app (`flutter build web --release --base-href /app/ --no-web-resources-cdn`) |
| `public/descargas/archivos/` | APK vigente para teléfonos ARM (más de 50 MB, menos del límite de 100 MB de GitHub) |
| `scripts/` | `preparar-descarga.mjs` (copia el APK y la versión web si faltan) y `verificar-lanzamientos.mjs` |

## Publicar una versión nueva de la app

1. Compila el APK con `flutter build apk --release --target-platform android-arm,android-arm64` (así pesa menos de 100 MB) y la versión web.
2. Reemplaza `public/descargas/archivos/` y `public/app/`.
3. Actualiza `src/datos/lanzamientos.json`: versión, fecha, `archivo`, `url` (`/descargas/archivos/...`), `tamanoBytes` y `sha256`.
4. `npm run build` y `npm test`. El build se detiene si el APK no coincide con el manifiesto.

## Capturas

Se generan con la app real: desde `../app`, `flutter test test_capturas` escribe los PNG en `build/capturas/`; después se copian a `src/assets/capturas/`.
