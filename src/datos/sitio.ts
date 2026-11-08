// Un código de: Joseph Ubaldo Trejo Hernández
// Datos generales del sitio. Cambiar un dato aquí lo cambia en todas las páginas.
import datos from './jalisco.json';

export const sitio = {
  nombre: 'PoliSafe Primer Nivel',
  marca: 'PoliSafe',
  descripcionCorta: 'Enfermería de primer nivel en Jalisco',
  descripcion:
    'PoliSafe Primer Nivel es la app gratuita de enfermería para las unidades de primer nivel de Jalisco: seguimiento de enfermedades crónicas por folio con las metas de las normas oficiales, PAE con NANDA-I, NIC y NOC, cálculos clínicos, farmacología, área quirúrgica, estudio y el panorama de salud de los 125 municipios, sin internet y sin datos personales.',
  correo: 'polisafe@polisafe.app',
  institucion: 'Instituto Politécnico Nacional',
  concurso: 'Hackathon Jalisco Internacional 2026 · Reto 02 Salud y Bienestar',
  avisoAcademico:
    'PoliSafe Primer Nivel es una herramienta de apoyo para la enfermería. No diagnostica, no indica tratamientos y no está validada médicamente: no sustituye el juicio clínico, la indicación médica ni los protocolos de la institución.',
} as const;

export const navegacion = [
  { href: '/producto/', texto: 'Producto' },
  { href: '/como-usar/', texto: 'Cómo usar' },
  { href: '/jalisco/', texto: 'Jalisco en datos' },
  { href: '/nosotros/', texto: 'Nosotros' },
  { href: '/descargas/', texto: 'Descargas' },
] as const;

const r = datos.resumen;
const nf = (v: number, d = 0) =>
  new Intl.NumberFormat('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

/** Cifras de Jalisco: salen de jalisco.json, que genera datos/scripts/pipeline.py. */
export const cifrasJalisco = [
  { valor: nf(Math.round(r.defunciones_cronicas_promedio_anual)), etiqueta: 'muertes por enfermedades crónicas al año' },
  { valor: `${nf(r.pct_cronicas_del_total, 1)} %`, etiqueta: 'de todas las defunciones de residentes' },
  { valor: `${nf(r.pct_cronicas_menores_60, 1)} %`, etiqueta: 'ocurren antes de los 60 años' },
  { valor: nf(r.unidades_publicas_primer_nivel), etiqueta: 'unidades públicas de primer nivel' },
  { valor: nf(r.jurisdicciones), etiqueta: 'jurisdicciones sanitarias' },
] as const;

/** Cifras de la app, verificadas contra los catálogos que trae (spec.md de la app). */
export const cifrasApp = [
  { valor: '4', etiqueta: 'padecimientos con seguimiento según su NOM' },
  { valor: '277', etiqueta: 'diagnósticos NANDA-I 2024-2026' },
  { valor: '155', etiqueta: 'medicamentos del Compendio 2025' },
  { valor: '18', etiqueta: 'calculadoras con fuente citada' },
  { valor: '125', etiqueta: 'municipios con su panorama sin internet' },
] as const;
