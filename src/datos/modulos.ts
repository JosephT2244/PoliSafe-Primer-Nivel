// Un código de: Joseph Ubaldo Trejo Hernández
// Módulos de la app. Cada capacidad describe lo que hace la versión 2.0.0 (spec.md de la app);
// las capturas se generan con test_capturas/ y datos de demostración ficticios.
import type { ImageMetadata } from 'astro';
import seguimiento from '../assets/capturas/seguimiento.png';
import pacientes from '../assets/capturas/seguimiento-pacientes.png';
import paciente from '../assets/capturas/seguimiento-paciente.png';
import consulta from '../assets/capturas/seguimiento-consulta.png';
import resultado from '../assets/capturas/seguimiento-resultado.png';
import jalisco from '../assets/capturas/jalisco.png';
import municipio from '../assets/capturas/jalisco-municipio.png';
import unidades from '../assets/capturas/jalisco-unidades.png';
import paes from '../assets/capturas/paes.png';
import diagnostico from '../assets/capturas/paes-diagnostico.png';
import calculos from '../assets/capturas/calculos.png';
import farmacologia from '../assets/capturas/farmacologia.png';
import quirurgico from '../assets/capturas/quirurgico.png';
import estudio from '../assets/capturas/estudio.png';
import buscar from '../assets/capturas/buscar.png';
import ajustes from '../assets/capturas/ajustes.png';

export interface Modulo {
  id: string;
  nombre: string;
  icono: string;
  resumen: string;
  capacidades: string[];
  capturas: { imagen: ImageMetadata; alt: string }[];
  nuevo?: boolean;
}

export const modulos: Modulo[] = [
  {
    id: 'seguimiento',
    nombre: 'Seguimiento de crónicos',
    icono: 'ph:clipboard-text-light',
    nuevo: true,
    resumen:
      'El control de diabetes, hipertensión, dislipidemia y obesidad en la unidad, por folio y sin nombres: qué pide la norma en cada visita, qué valor está fuera de meta y quién no ha vuelto.',
    capacidades: [
      'Registro por folio o número de expediente; la app rechaza nombres y CURP, y no tiene campos de contacto.',
      'Consulta con presión arterial (promedio de dos tomas), glucemia capilar, peso, cintura, exploración de pies y lípidos; primero aparece lo que la NOM pide en esa visita.',
      'Cada valor fuera de meta se marca con el numeral y el texto literal de la NOM-015, NOM-030, NOM-037 o NOM-008. Es una referencia, no un diagnóstico.',
      'Indicador de la unidad: porcentaje de pacientes con seguimiento completo y vigente, con la vigencia que elijas (30, 60, 90 o 180 días).',
      'Lista de pendientes ordenada: primero quien no tiene consulta vigente, luego las consultas incompletas.',
      'Resumen de la unidad en PDF, sin nombres, para la junta o el informe.',
    ],
    capturas: [
      { imagen: seguimiento, alt: 'Pantalla Seguimiento de crónicos con 58.3 % de pacientes con seguimiento completo y vigente, 14 de 24, y la lista de pendientes. Datos de demostración ficticios.' },
      { imagen: resultado, alt: 'Consulta guardada con dos valores fuera de meta: glucemia en ayuno y IMC, cada uno con su norma y numeral.' },
      { imagen: consulta, alt: 'Formulario Registrar consulta con el aviso de lo que pide la NOM en cada visita y los campos de presión arterial en dos tomas.' },
    ],
  },
  {
    id: 'jalisco',
    nombre: 'Jalisco en la app',
    icono: 'ph:map-trifold-light',
    nuevo: true,
    resumen:
      'El panorama de salud de Jalisco dentro de la app y sin internet: carga de enfermedades crónicas, los 125 municipios y las 854 unidades públicas de primer nivel.',
    capacidades: [
      'Muertes por causa crónica en el estado y en cada municipio, con tasas separadas para 18 a 59 años y 60 años y más.',
      'Ficha de cada municipio: jurisdicción, población, unidades por 10 mil habitantes, población lejos de una unidad, afiliación y marginación.',
      'Red de unidades con búsqueda por nombre, filtro por institución y municipio, y apertura de la ubicación en el mapa del teléfono.',
      'Cada cifra cita su fuente oficial: INEGI, Secretaría de Salud (CLUES) y CONAPO.',
    ],
    capturas: [
      { imagen: jalisco, alt: 'Pantalla Jalisco con 32,199 muertes por enfermedades crónicas al año y 854 unidades públicas de primer nivel.' },
      { imagen: municipio, alt: 'Ficha del municipio de Guadalajara con su jurisdicción, población, tasas por edad, unidades y muertes por causa.' },
      { imagen: unidades, alt: 'Red de unidades filtrada por el municipio de Guadalajara con 67 unidades públicas de primer nivel.' },
    ],
  },
  {
    id: 'pae',
    nombre: 'Proceso de Atención de Enfermería',
    icono: 'ph:notebook-light',
    resumen:
      'Las cinco etapas del PAE en un solo flujo, con los catálogos NANDA-I, NIC y NOC en el dispositivo y el PDF institucional al terminar.',
    capacidades: [
      'Valoración, diagnóstico, planificación, ejecución y evaluación, cada una con su historial.',
      'Búsqueda de diagnósticos NANDA-I por código o texto, con tipo, prioridad y página del libro impreso.',
      'Sugerencia de NOC y NIC relacionados con el diagnóstico elegido.',
      'Desde la ficha de un paciente en seguimiento se abre un PAE nuevo o las calculadoras en un toque.',
    ],
    capturas: [
      { imagen: diagnostico, alt: 'Pantalla Diagnóstico con resultados NANDA-I para la búsqueda "dolor": 00132 Dolor agudo, 00133 Dolor crónico y otros.' },
      { imagen: paes, alt: 'Pantalla PAE con las cinco etapas y las herramientas Nuevo PAE e Historial.' },
    ],
  },
  {
    id: 'calculos',
    nombre: 'Cálculos clínicos',
    icono: 'ph:calculator-light',
    resumen: 'Dieciocho calculadoras con validación de captura, unidades, interpretación en palabras, fórmula y fuente en cada resultado.',
    capacidades: [
      'Signos vitales, antropometría (IMC, superficie corporal), dosis por peso, goteo, tiempo de infusión y balance hídrico.',
      'Laboratorio: electrolitos, CKD-EPI 2021 y Cockcroft-Gault; respiratorio: FiO₂ e índice PaO₂/FiO₂.',
      'Pacientes de práctica con alias cuyos datos se heredan a cada calculadora; historial que se copia o exporta a PDF.',
    ],
    capturas: [{ imagen: calculos, alt: 'Pantalla Calculadora para Enfermería con la tarjeta del paciente, su configuración rápida y la calculadora de presión arterial media.' }],
  },
  {
    id: 'farmacologia',
    nombre: 'Farmacología',
    icono: 'ph:pill-light',
    resumen:
      '155 fichas de medicamentos con su monografía oficial del Compendio Nacional de Insumos para la Salud 2025, entre ellos los antihipertensivos, antidiabéticos e hipolipemiantes del primer nivel.',
    capacidades: [
      'Presentaciones, vía y dosis, riesgo en el embarazo, efectos adversos, contraindicaciones e interacciones.',
      'Aviso de doble verificación en insulinas, anticoagulantes, opioides y electrolitos concentrados, según la Acción Esencial 3.',
      'Buscador por nombre, grupo, indicación o clave del Compendio, y favoritos por perfil.',
    ],
    capturas: [{ imagen: farmacologia, alt: 'Lista de 155 medicamentos con losartán, telmisartán, amlodipino y otros antihipertensivos.' }],
  },
  {
    id: 'quirurgico',
    nombre: 'Área quirúrgica',
    icono: 'ph:first-aid-kit-light',
    resumen: 'Instrumental, bultos, tiempos, Lista de Verificación de la cirugía, conteo, posiciones y funciones de enfermería.',
    capacidades: [
      'Ficha de cada instrumento y tiempo quirúrgico con características, usos y fuente.',
      'Lista de Verificación de la Acción Esencial 4 por fases y manual exportable a PDF.',
    ],
    capturas: [{ imagen: quirurgico, alt: 'Área quirúrgica con el catálogo de instrumental: pinzas para campos de Backhaus y pinzas de disección.' }],
  },
  {
    id: 'estudio',
    nombre: 'Estudio',
    icono: 'ph:books-light',
    resumen: 'Terminología médica, tablas de referencia y Normas Oficiales Mexicanas, incluidas las de enfermedades crónicas que usa el seguimiento.',
    capacidades: [
      '105 términos con fuente, tablas, 25 NOM y 8 Acciones Esenciales con su texto oficial buscable.',
      'Repaso con tarjetas y cuestionarios; exportación a PDF.',
    ],
    capturas: [{ imagen: estudio, alt: 'Pestaña Terminología de Estudio con 105 términos y su definición de DeCS.' }],
  },
  {
    id: 'busqueda',
    nombre: 'Búsqueda global',
    icono: 'ph:magnifying-glass-light',
    resumen: 'Un solo buscador para diagnósticos, intervenciones, resultados, medicamentos, terminología, normas, instrumental y calculadoras.',
    capacidades: ['Ignora acentos y mayúsculas; cada resultado abre su pantalla con el dato ya cargado.'],
    capturas: [{ imagen: buscar, alt: 'Búsqueda global de "insulina" con cuatro medicamentos encontrados.' }],
  },
  {
    id: 'perfiles',
    nombre: 'Perfiles y ajustes',
    icono: 'ph:user-circle-light',
    resumen:
      'Varias enfermeras pueden compartir un teléfono de la unidad: hasta ocho perfiles, cada uno con sus pacientes y registros separados y protegido con PIN o huella.',
    capacidades: [
      'PIN de 4 a 6 dígitos guardado con PBKDF2; huella o rostro en Android.',
      'Vigencia del seguimiento, pacientes de demostración, tema claro u oscuro, recordatorios y borrado de datos por perfil.',
    ],
    capturas: [{ imagen: ajustes, alt: 'Ajustes con el perfil principal, la administración de perfiles, el tema y los recordatorios.' }],
  },
];

export const capturasExtra = { pacientes, paciente };
