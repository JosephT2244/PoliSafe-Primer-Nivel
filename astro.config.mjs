// Un código de: Joseph Ubaldo Trejo Hernández
// Configuración del sitio de PoliSafe Primer Nivel, tomada del sitio de PoliSafe. Sitio estático.
// En GitHub Pages el flujo .github/workflows/pages.yml pasa SITIO_URL y BASE_PATH (la subcarpeta del
// repositorio); sin ellas el sitio se construye para la raíz y sin enlaces absolutos ni sitemap.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { base, sitioUrl, rutasConBase } from './src/lib/despliegue.mjs';

export default defineConfig({
  site: sitioUrl,
  base: base || undefined,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'recursos',
  },
  image: {
    responsiveStyles: false,
  },
  integrations: [
    icon({ include: { ph: ['*'] } }),
    ...(sitioUrl ? [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-MX' } } })] : []),
    rutasConBase(),
  ],
  vite: {
    build: {
      // Sin scripts en línea: la política de seguridad de contenido solo permite 'self'.
      assetsInlineLimit: 0,
    },
  },
});
