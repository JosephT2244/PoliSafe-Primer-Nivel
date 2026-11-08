// Un código de: Joseph Ubaldo Trejo Hernández
// Guía "Cómo usar PoliSafe Primer Nivel": pasos con capturas reales de la versión 2.0.0 (datos de demostración ficticios).
import type { ImageMetadata } from 'astro';
import inicio from '../assets/capturas/inicio.png';
import pacientes from '../assets/capturas/seguimiento-pacientes.png';
import consulta from '../assets/capturas/seguimiento-consulta.png';
import resultado from '../assets/capturas/seguimiento-resultado.png';
import seguimiento from '../assets/capturas/seguimiento.png';
import paciente from '../assets/capturas/seguimiento-paciente.png';
import municipio from '../assets/capturas/jalisco-municipio.png';
import diagnostico from '../assets/capturas/paes-diagnostico.png';
import farmacologia from '../assets/capturas/farmacologia.png';
import ajustes from '../assets/capturas/ajustes.png';
import oscuro from '../assets/capturas/inicio-oscuro.png';

export interface Paso {
  id: string;
  titulo: string;
  texto: string;
  consejos: string[];
  captura: { imagen: ImageMetadata; alt: string };
}

export const pasos: Paso[] = [
  {
    id: 'inicio',
    titulo: 'Empieza en Inicio',
    texto:
      'Inicio resume el seguimiento de tu unidad y el panorama de Jalisco, y trae los accesos rápidos: Registrar consulta, Nuevo PAE, Calcular goteo y Buscar medicamento. La barra inferior lleva a Seguimiento, PAE, Cálculos y Más.',
    consejos: [
      'El botón de seguimiento de la barra superior abre el seguimiento de crónicos desde cualquier sección.',
      'Para conocer la app sin capturar nada, carga los pacientes de demostración en Ajustes. Todos sus folios empiezan con DEMO-.',
    ],
    captura: { imagen: inicio, alt: 'Pantalla Inicio con el panel Primer nivel en Jalisco, el seguimiento de crónicos con 10 pendientes y los accesos rápidos.' },
  },
  {
    id: 'paciente',
    titulo: 'Agrega a un paciente por su folio',
    texto:
      'En Seguimiento toca Agregar paciente. Escribe el folio o número de expediente, el sexo, el grupo de edad, la talla y sus padecimientos: diabetes, hipertensión, dislipidemia u obesidad. No hay campo para el nombre.',
    consejos: [
      'Si el folio parece un nombre o una CURP, la app no lo guarda y te explica por qué.',
      'La lista de pacientes se filtra por estado: completo y vigente, consulta incompleta o sin consulta vigente.',
    ],
    captura: { imagen: pacientes, alt: 'Lista de 24 pacientes de demostración con su folio, padecimientos y estado del seguimiento.' },
  },
  {
    id: 'consulta',
    titulo: 'Registra la consulta',
    texto:
      'En la ficha del paciente toca Registrar consulta. Arriba aparece lo que la NOM pide en cada visita para sus padecimientos. Puedes capturar dos tomas de presión: la app guarda el promedio, como indica la NOM-030.',
    consejos: [
      'Los valores fuera de un rango posible, como una glucemia de 900 mg/dl, se rechazan antes de guardar.',
      'Si falta algo de lo que pide la norma, la consulta se guarda igual y queda como pendiente.',
    ],
    captura: { imagen: consulta, alt: 'Formulario Registrar consulta con el aviso de lo que pide la NOM en cada visita y los campos de presión arterial.' },
  },
  {
    id: 'resultado',
    titulo: 'Lee los valores fuera de meta con su norma',
    texto:
      'Al guardar, la app compara cada valor con las metas de las normas oficiales y te muestra cuáles están fuera de meta, con el numeral y el texto literal de la norma. También clasifica el IMC con la NOM-008.',
    consejos: [
      'Es una referencia de la norma, no un diagnóstico: la decisión clínica es del personal de salud.',
      'Toca Ver texto de la norma para leer el párrafo completo.',
    ],
    captura: { imagen: resultado, alt: 'Consulta guardada con la glucemia en ayuno y el IMC fuera de meta, cada uno con su norma y numeral.' },
  },
  {
    id: 'pendientes',
    titulo: 'Revisa el indicador y los pendientes',
    texto:
      'Seguimiento muestra qué porcentaje de tus pacientes tiene el seguimiento completo y vigente, y la lista de pendientes: primero quien no tiene consulta vigente, luego las consultas incompletas.',
    consejos: [
      'La vigencia se cambia en Ajustes: 30, 60, 90 o 180 días.',
      'Exporta el resumen de la unidad en PDF desde la barra superior. El PDF no lleva nombres.',
    ],
    captura: { imagen: seguimiento, alt: 'Seguimiento de crónicos con 58.3 % de seguimiento completo y vigente y la lista de pendientes.' },
  },
  {
    id: 'ficha',
    titulo: 'Consulta la historia de cada paciente',
    texto:
      'La ficha del paciente muestra el estado de su seguimiento, sus datos, los valores de la última consulta y todas sus consultas anteriores. Desde ahí abres un PAE nuevo o las calculadoras.',
    consejos: ['Puedes editar los datos del paciente o eliminarlo; la app pide confirmación con la acción nombrada.'],
    captura: { imagen: paciente, alt: 'Ficha del paciente DEMO-002 con seguimiento completo y vigente y los valores de su última consulta.' },
  },
  {
    id: 'jalisco',
    titulo: 'Conoce tu municipio',
    texto:
      'En Más, Jalisco muestra la carga de enfermedades crónicas del estado, los 125 municipios y las 854 unidades públicas de primer nivel. Todo viene dentro de la app y funciona sin internet.',
    consejos: [
      'Cada municipio tiene sus tasas por edad, su jurisdicción, sus unidades y su población lejos de una unidad.',
      'Desde una unidad puedes abrir su ubicación en el mapa del teléfono.',
    ],
    captura: { imagen: municipio, alt: 'Ficha del municipio de Guadalajara con su jurisdicción, población, tasas por edad y unidades.' },
  },
  {
    id: 'pae',
    titulo: 'Usa el resto de PoliSafe',
    texto:
      'El PAE con NANDA-I, NIC y NOC, los cálculos clínicos, la farmacología, el área quirúrgica y el estudio funcionan igual que en PoliSafe. En Diagnóstico escribe una palabra o un código, por ejemplo "dolor" o "00132".',
    consejos: ['La lupa de la barra superior busca en toda la app: diagnósticos, medicamentos, normas, instrumental y calculadoras.'],
    captura: { imagen: diagnostico, alt: 'Pantalla Diagnóstico con los resultados NANDA-I para la búsqueda "dolor".' },
  },
  {
    id: 'farmacologia',
    titulo: 'Consulta un medicamento',
    texto:
      'En Más, Farmacología trae 155 fichas con la monografía oficial del Compendio Nacional de Insumos para la Salud 2025, entre ellas los antihipertensivos, antidiabéticos e hipolipemiantes del primer nivel.',
    consejos: ['Los medicamentos de alto riesgo, como las insulinas, muestran el aviso de doble verificación.'],
    captura: { imagen: farmacologia, alt: 'Lista de 155 medicamentos con losartán, telmisartán, amlodipino y otros antihipertensivos.' },
  },
  {
    id: 'ajustes',
    titulo: 'Protege tu perfil',
    texto:
      'Si varias personas comparten el teléfono de la unidad, en Ajustes crea un perfil para cada una. Cada perfil tiene sus propios pacientes, consultas y registros, y se protege con PIN o huella.',
    consejos: ['En Ajustes también eliges el tema, configuras recordatorios y borras los datos de un perfil.'],
    captura: { imagen: ajustes, alt: 'Ajustes con el perfil principal, la administración de perfiles, el tema y los recordatorios.' },
  },
];

export const capturaOscura = {
  imagen: oscuro,
  alt: 'Pantalla Inicio de PoliSafe Primer Nivel en modo oscuro.',
};
