// Un código de: Joseph Ubaldo Trejo Hernández
// Contenido de la página Nosotros de PoliSafe Primer Nivel.

export const mision =
  'Dar a la enfermería de primer nivel de Jalisco una herramienta confiable para dar seguimiento a las enfermedades crónicas de su unidad, con las metas de las normas oficiales a la mano, sin internet y sin exponer datos personales.';

export const vision =
  'Que cada unidad de primer nivel sepa, sin papeleo extra, qué pacientes con enfermedades crónicas tienen su control al día y quiénes necesitan volver, y que esa información ayude a planear el cuidado en todo el estado.';

export const queHacemos = [
  {
    titulo: 'Diseñamos software clínico',
    texto: 'Construimos PoliSafe Primer Nivel en Flutter con un sistema de diseño propio, especificaciones escritas antes de cada cambio y cientos de pruebas automatizadas.',
  },
  {
    titulo: 'Verificamos cada dato',
    texto: 'Cada meta del seguimiento cita su norma y su numeral, y cada cifra de Jalisco sale de un programa reproducible a partir de los archivos oficiales.',
  },
  {
    titulo: 'Protegemos la información',
    texto: 'La app no pide nombres, no tiene permiso de internet y guarda todo en el teléfono. No usamos analítica ni publicidad.',
  },
];

export const valores = [
  { nombre: 'Seguridad clínica', texto: 'Un valor mal capturado puede llegar a un paciente real. Por eso la app valida rangos, muestra unidades y cita la norma de cada meta.', icono: 'ph:shield-check-light' },
  { nombre: 'Precisión', texto: 'Copiamos los textos de las normas sin parafrasear y documentamos cómo se calcula cada cifra.', icono: 'ph:crosshair-light' },
  { nombre: 'Privacidad', texto: 'Folios en lugar de nombres, datos solo en el dispositivo y perfiles con PIN o huella.', icono: 'ph:lock-key-light' },
  { nombre: 'Accesibilidad', texto: 'Diseñamos con objetivo WCAG 2.1 AA: contraste, lector de pantalla y texto ampliado al 200 %.', icono: 'ph:wheelchair-light' },
  { nombre: 'Criterio profesional', texto: 'La app apoya, no decide. Un valor fuera de meta es una referencia de la norma, no un diagnóstico.', icono: 'ph:stethoscope-light' },
  { nombre: 'Acceso gratuito', texto: 'Gratuita, sin planes, licencias ni pagos.', icono: 'ph:hand-heart-light' },
];

export const equipo = [
  {
    nombre: 'Joseph Ubaldo Trejo Hernández',
    iniciales: 'JT',
    rol: 'Fundador y desarrollador',
    texto: 'Dirige el producto, la arquitectura y el desarrollo de PoliSafe en Flutter, desde la especificación hasta la publicación.',
  },
  {
    nombre: 'Sofía Cruz García',
    iniciales: 'SC',
    rol: 'Cocreadora y consultora de enfermería.',
    texto: 'Participa en la construcción de PoliSafe y en la revisión de su contenido de enfermería.',
  },
  {
    nombre: 'Fernando Lima Sánchez',
    iniciales: 'FL',
    rol: 'Cocreador',
    texto: 'Participa en la construcción de PoliSafe y en la revisión de su contenido de enfermería.',
  },
  {
    nombre: 'Ernesto Álvarez Hernández',
    iniciales: 'EA',
    rol: 'Cocreador',
    texto: 'Participa en la construcción de PoliSafe y en la revisión de su contenido de enfermería.',
  },
];

/** Personas que no forman parte del equipo registrado en el concurso, pero sin las que PoliSafe no existiría. */
export const colaboracion = [
  {
    nombre: 'María Guadalupe Cortés Cano',
    iniciales: 'MC',
    rol: 'Enfermera. Cotitular de la idea de PoliSafe',
    texto: 'Fue parte fundamental del proyecto: como enfermera aportó la información y la experiencia de la práctica de la que nacen PoliSafe y su seguimiento de crónicos, por lo que la idea de PoliSafe también es suya. No forma parte del equipo registrado en el Hackathon Jalisco.',
  },
];

/** Fechas tomadas del historial de PoliSafe y de este proyecto. */
export const trayectoria = [
  { fecha: '2026-01-11', titulo: 'Primera versión de PoliSafe', texto: 'Nace PoliSafe como app Flutter de estudio para enfermería con PAE, farmacología, cálculos y área quirúrgica.' },
  { fecha: '2026-09-16', titulo: 'Constitución y especificaciones', texto: 'El proyecto adopta desarrollo guiado por especificaciones, una constitución de reglas y una puerta de calidad obligatoria.' },
  { fecha: '2026-09-18', titulo: 'Nuevo sistema de diseño', texto: 'Interfaz guinda y crema con modo oscuro, navegación adaptable y cálculos con fuente.' },
  { fecha: '2026-10-02', titulo: 'Lanzamiento público de PoliSafe', texto: 'Sitio y descargas públicas de PoliSafe para Android y Windows.' },
  { fecha: '2026-10-04', titulo: 'Farmacología con el Compendio oficial', texto: '155 medicamentos con su monografía del Compendio Nacional de Insumos para la Salud 2025 y aviso de doble verificación.' },
  { fecha: '2026-11-07', titulo: 'PoliSafe Primer Nivel 2.0.0', texto: 'Para el Hackathon Jalisco Internacional 2026: seguimiento de crónicos con las metas de las NOM, panorama de Jalisco con datos oficiales y la app sin internet.' },
];
