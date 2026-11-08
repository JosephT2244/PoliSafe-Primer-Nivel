// Un código de: Joseph Ubaldo Trejo Hernández
// Contrato del manifiesto de lanzamientos, tomado del sitio de PoliSafe (spec 008 v2, RF-008-05).
// En PoliSafe Primer Nivel el APK se publica junto al sitio, en /descargas/archivos/, y se
// sirve desde el mismo dominio. Un manifiesto inválido detiene el build.

export const plataformas = {
  android: { nombre: 'Android', canales: ['apk', 'google-play'] },
  windows: { nombre: 'Windows', canales: ['zip-windows', 'instalador-windows', 'microsoft-store'] },
  ios: { nombre: 'iPhone y iPad', canales: ['app-store', 'testflight'] },
  macos: { nombre: 'macOS', canales: ['dmg', 'mac-app-store'] },
};

const canalesDirectos = new Set(['apk', 'zip-windows', 'instalador-windows', 'dmg']);
const extensiones = { apk: '.apk', 'zip-windows': '.zip', 'instalador-windows': '.exe', dmg: '.dmg' };
const dominiosTienda = {
  'google-play': ['play.google.com'],
  'microsoft-store': ['apps.microsoft.com'],
  'app-store': ['apps.apple.com'],
  testflight: ['testflight.apple.com'],
  'mac-app-store': ['apps.apple.com'],
};

/** Carpeta del sitio donde se publican los archivos directos (mismo dominio). */
export const carpetaArchivos = '/descargas/archivos/';

function fechaValida(valor) {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().slice(0, 10) === valor;
}

function leerUrl(valor) {
  try {
    const url = new URL(valor);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url;
  } catch {
    return null;
  }
}

export function urlDirectaAprobada(valor) {
  return typeof valor === 'string' && valor.startsWith(carpetaArchivos) && !valor.includes('..') && !/[?#]/.test(valor);
}

function urlTiendaAprobada(valor, canal) {
  const url = leerUrl(valor);
  return Boolean(url && (dominiosTienda[canal] || []).includes(url.hostname));
}

export function erroresManifiesto(datos) {
  const errores = [];
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) return ['El manifiesto debe ser un objeto.'];
  if (datos.esquema !== 2) errores.push('La versión del esquema no es compatible (se espera 2).');
  if (!fechaValida(datos.actualizadoEn)) errores.push('La fecha de actualización no es válida.');
  if (!Array.isArray(datos.lanzamientos)) return [...errores, 'Falta la lista de lanzamientos.'];

  const ids = new Set();
  for (const [indice, item] of datos.lanzamientos.entries()) {
    const prefijo = `Lanzamiento ${indice + 1}`;
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errores.push(`${prefijo}: formato inválido.`);
      continue;
    }
    if (typeof item.id !== 'string' || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)) {
      errores.push(`${prefijo}: identificador inválido o repetido.`);
    } else {
      ids.add(item.id);
    }
    if (!plataformas[item.plataforma]?.canales.includes(item.canal)) errores.push(`${prefijo}: plataforma o canal inválido.`);
    if (!['disponible', 'retirado'].includes(item.estado)) errores.push(`${prefijo}: estado inválido.`);
    if (!/^\d+\.\d+\.\d+$/.test(item.version || '') || !Number.isInteger(item.build) || item.build < 1) {
      errores.push(`${prefijo}: versión o compilación inválida.`);
    }
    if (!fechaValida(item.fecha)) errores.push(`${prefijo}: fecha inválida.`);
    if (typeof item.requisitos !== 'string' || !item.requisitos.trim()
      || typeof item.notas !== 'string' || !item.notas.trim()) {
      errores.push(`${prefijo}: faltan requisitos o notas.`);
    }
    if (item.estado === 'retirado') {
      if (item.url) errores.push(`${prefijo}: un archivo retirado no puede tener enlace.`);
      if (typeof item.motivoRetiro !== 'string' || !item.motivoRetiro.trim()) {
        errores.push(`${prefijo}: falta el motivo del retiro.`);
      }
      continue;
    }
    const directo = canalesDirectos.has(item.canal);
    if (directo) {
      if (!urlDirectaAprobada(item.url)) errores.push(`${prefijo}: el archivo debe publicarse en ${carpetaArchivos}.`);
      if (typeof item.archivo !== 'string' || !item.archivo.toLowerCase().endsWith(extensiones[item.canal])
        || !String(item.url || '').endsWith(`/${item.archivo}`)) {
        errores.push(`${prefijo}: el nombre del archivo no coincide con el canal o con el enlace.`);
      }
      if (!Number.isInteger(item.tamanoBytes) || item.tamanoBytes < 1 || !/^[a-f0-9]{64}$/.test(item.sha256 || '')) {
        errores.push(`${prefijo}: faltan tamaño o SHA-256 (64 caracteres hexadecimales en minúsculas).`);
      }
    } else if (!urlTiendaAprobada(item.url, item.canal)) {
      errores.push(`${prefijo}: el enlace no pertenece a la tienda oficial.`);
    }
  }
  return errores;
}

export function lanzamientosDisponibles(datos, plataforma) {
  return datos.lanzamientos
    .filter((item) => item.plataforma === plataforma && item.estado === 'disponible')
    .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.build - a.build);
}

/** Lanzamiento vigente de una plataforma o null. */
export function vigente(datos, plataforma) {
  return lanzamientosDisponibles(datos, plataforma)[0] || null;
}

export function megabytes(bytes) {
  return `${(bytes / 1_000_000).toLocaleString('es-MX', { maximumFractionDigits: 0 })} MB`;
}

export function fechaLarga(iso) {
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}
