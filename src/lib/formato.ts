// Un código de: Joseph Ubaldo Trejo Hernández
// Formato es-MX con espacio no separable entre número y unidad (guía de interfaz §5.2).
const nf = (d: number) => new Intl.NumberFormat('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });

export const entero = (v: number) => nf(0).format(Math.round(v));
export const decimal = (v: number, d = 1) => nf(d).format(v);
export const pct = (v: number | null | undefined, d = 1) => (v == null ? 'Sin dato' : `${nf(d).format(v)} %`);
// El catálogo CLUES viene en mayúsculas y a veces sin acentos.
const acentos: Record<string, string> = {
  Secretaria: 'Secretaría',
  Medicos: 'Médicos',
  Medico: 'Médico',
  Medica: 'Médica',
  Clinica: 'Clínica',
  Integracion: 'Integración',
  Estadistica: 'Estadística',
  Geografica: 'Geográfica',
};

export const titulo = (s: string) =>
  s
    .toLowerCase()
    .replace(/(^|[\s(-])(\p{L})/gu, (_m, a: string, b: string) => a + b.toUpperCase())
    .replace(/\b(De|Del|La|Las|Los|Y|El)\b/g, (m) => m.toLowerCase())
    .replace(/^(\p{L})/u, (m) => m.toUpperCase())
    .replace(/\p{L}+/gu, (p) => acentos[p] ?? p);
