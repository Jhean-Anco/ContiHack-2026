/**
 * ANDAMIO PROVISIONAL DE INTERFAZ — ARCHIVO DESECHABLE.
 *
 * Simula las respuestas del API de contenido para poder construir y probar la
 * interfaz mientras `apps/backend/src/content/` y sus endpoints no existen, según
 * autoriza docs/06-implementacion/preparacion-pmv.md.
 *
 * Reglas de este archivo:
 * - Nada de aquí es contenido histórico, curricular ni cartográfico real. Los
 *   textos son relleno rotulado; no imitan documentos de época ni citas.
 * - La diferenciación por grado es un marcador de estructura, no una progresión
 *   pedagógica revisada.
 * - El veredicto que devuelve sirve para ejercitar los estados de la pantalla; no
 *   es una clave de respuesta aprobada. La autoridad de corrección será del
 *   backend (docs/07-agentes/reparto-claude-codex.md).
 * - Cuando Codex publique el contenido real, este archivo se borra completo.
 */

import type {
  Ayuda,
  Grado,
  ManifiestoContenido,
  Mision,
  OpcionRuta,
  Reto,
  SolicitudAyuda,
  SolicitudIntento,
  Veredicto,
  Zona,
} from "./contratos";

const AVISO = {
  esEjemploFicticio: true,
  texto:
    "Contenido de ejemplo ficticio para probar la interfaz. No es historia de Huancayo, " +
    "no está validado curricularmente y no representa calles reales.",
} as const;

export const ID_MISION_EJEMPLO = "mision-ejemplo-01";
const VERSION_EJEMPLO = "ejemplo-0.1.0";

/** Clave interna del andamio. No sale al contrato ni llega a los componentes. */
const OPCIONES_RESPALDADAS: Record<string, string[]> = {
  "reto-fuentes": ["opcion-fuentes-b"],
  "reto-ruta": ["ruta-2"],
};

const zonaEjemplo: Zona = {
  id: "zona-ejemplo",
  nombre: "Zona de ensayo (recreación ficticia)",
  descripcionAlternativa:
    "Esquema de ensayo con cinco puntos alrededor de un punto ancla. Las posiciones son " +
    "ilustrativas y no corresponden a calles reales; sirven para probar la navegación.",
  anclaId: "punto-ancla",
  puntos: [
    {
      id: "punto-ancla",
      nombre: "Punto ancla",
      descripcion: "Centro del esquema. Punto de partida de todos los recorridos de ejemplo.",
      x: 50,
      y: 52,
      manzanasDesdeAncla: 0,
      esAncla: true,
    },
    {
      id: "punto-norte",
      nombre: "Punto norte",
      descripcion: "A una manzana del ancla, hacia arriba del esquema.",
      x: 50,
      y: 20,
      manzanasDesdeAncla: 1,
      esAncla: false,
    },
    {
      id: "punto-este",
      nombre: "Punto este",
      descripcion: "A dos manzanas del ancla, hacia la derecha del esquema.",
      x: 82,
      y: 44,
      manzanasDesdeAncla: 2,
      esAncla: false,
    },
    {
      id: "punto-sur",
      nombre: "Punto sur",
      descripcion: "A dos manzanas del ancla, hacia abajo del esquema.",
      x: 56,
      y: 82,
      manzanasDesdeAncla: 2,
      esAncla: false,
    },
    {
      id: "punto-oeste",
      nombre: "Punto oeste",
      descripcion: "A tres manzanas del ancla, hacia la izquierda del esquema.",
      x: 16,
      y: 60,
      manzanasDesdeAncla: 3,
      esAncla: false,
    },
  ],
  tramos: [
    { desde: "punto-ancla", hacia: "punto-norte", manzanas: 1 },
    { desde: "punto-ancla", hacia: "punto-este", manzanas: 2 },
    { desde: "punto-ancla", hacia: "punto-sur", manzanas: 2 },
    { desde: "punto-ancla", hacia: "punto-oeste", manzanas: 3 },
    { desde: "punto-norte", hacia: "punto-este", manzanas: 2 },
    { desde: "punto-sur", hacia: "punto-oeste", manzanas: 2 },
  ],
};

const fuentesEjemplo = [
  {
    id: "fuente-a",
    titulo: "Ficha de ejemplo A (sin fuente real)",
    autoria: "Relleno de prototipo, sin autoría real",
    fecha: "Sin fecha: dato de ejemplo",
    contexto: "Tarjeta de relleno para probar cómo se lee una ficha con procedencia incompleta.",
    fragmento:
      "Texto de relleno para maquetar la tarjeta. No es una cita, un documento ni un testimonio; " +
      "solo ocupa el espacio del fragmento mientras se define el contenido real.",
    estadoProvenance: "pendiente_de_validacion" as const,
    nota: "Ficha sin localizador: en el contenido real no podría publicarse así.",
  },
  {
    id: "fuente-b",
    titulo: "Ficha de ejemplo B (sin fuente real)",
    autoria: "Relleno de prototipo, con campos de procedencia completos",
    fecha: "Sin fecha: dato de ejemplo",
    contexto: "Tarjeta de relleno que sí trae todos los campos de procedencia del formulario.",
    fragmento:
      "Segundo texto de relleno. Su única diferencia con la ficha A es que aquí los campos de " +
      "autoría, fecha y localizador están completos, para contrastar ambos estados en pantalla.",
    estadoProvenance: "verificada" as const,
    localizador: "Localizador de ejemplo, no resoluble",
  },
  {
    id: "fuente-c",
    titulo: "Ficha de ejemplo C (sin fuente real)",
    autoria: "Relleno de prototipo, con dato en disputa",
    fecha: "Sin fecha: dato de ejemplo",
    contexto: "Tarjeta de relleno para probar el aviso de discrepancia entre fichas.",
    fragmento:
      "Tercer texto de relleno. Representa el caso de una ficha cuyo dato contradice a otra y que " +
      "por eso no puede sostener una afirmación por sí sola.",
    estadoProvenance: "pendiente_de_validacion" as const,
    nota: "Contradice un dato de la ficha B. En el contenido real exige resolución documentada.",
  },
];

const rutasEjemplo: OpcionRuta[] = [
  {
    id: "ruta-1",
    etiqueta: "Recorrido 1: ancla → punto norte → punto este",
    detalle: "Sube una manzana y luego cruza dos.",
    puntos: ["punto-ancla", "punto-norte", "punto-este"],
    manzanasTotales: 3,
  },
  {
    id: "ruta-2",
    etiqueta: "Recorrido 2: ancla → punto este",
    detalle: "Va directo hacia la derecha del esquema.",
    puntos: ["punto-ancla", "punto-este"],
    manzanasTotales: 2,
  },
  {
    id: "ruta-3",
    etiqueta: "Recorrido 3: ancla → punto sur → punto oeste",
    detalle: "Baja dos manzanas y luego cruza dos.",
    puntos: ["punto-ancla", "punto-sur", "punto-oeste"],
    manzanasTotales: 4,
  },
];

/**
 * Diferenciación de ejemplo por grado. Solo cambia cantidad de fichas, cantidad de
 * recorridos y número de ayudas, para que la interfaz tenga que soportar variantes.
 * No describe demanda cognitiva ni progresión curricular.
 */
const variantes: Record<Grado, { fuentes: number; rutas: number; ayudas: number }> = {
  1: { fuentes: 2, rutas: 2, ayudas: 2 },
  2: { fuentes: 2, rutas: 3, ayudas: 2 },
  3: { fuentes: 3, rutas: 3, ayudas: 2 },
  4: { fuentes: 3, rutas: 3, ayudas: 1 },
  5: { fuentes: 3, rutas: 3, ayudas: 1 },
};

function retosEjemplo(grado: Grado): Reto[] {
  const variante = variantes[grado];
  return [
    {
      tipo: "fuentes",
      id: "reto-fuentes",
      titulo: "Revisar las fichas",
      instruccion:
        "Lee las fichas de ejemplo y elige la afirmación que quedaría respaldada por lo que " +
        "muestran. Puedes volver a las fichas en cualquier momento.",
      ayudasDisponibles: variante.ayudas,
      fuentes: fuentesEjemplo.slice(0, variante.fuentes),
      seleccionMultiple: false,
      opciones: [
        {
          id: "opcion-fuentes-a",
          etiqueta: "La ficha A alcanza para dar el dato por cerrado.",
          detalle: "Opción de relleno: la ficha A no declara autoría ni localizador.",
        },
        {
          id: "opcion-fuentes-b",
          etiqueta: "Solo la ficha con procedencia completa sostiene una afirmación.",
          detalle: "Opción de relleno: revisa qué ficha declara autoría, fecha y localizador.",
        },
        {
          id: "opcion-fuentes-c",
          etiqueta: "Las fichas dicen lo mismo, así que cualquiera sirve.",
          detalle: "Opción de relleno: compara los datos entre fichas antes de decidir.",
        },
      ],
    },
    {
      tipo: "ruta",
      id: "reto-ruta",
      titulo: "Elegir un recorrido",
      instruccion:
        "Mira el esquema y elige el recorrido que cumple la condición. El esquema no es un mapa " +
        "real: las posiciones son de ejemplo.",
      ayudasDisponibles: variante.ayudas,
      zonaId: zonaEjemplo.id,
      condicion: "Llegar al punto este sin pasar por más de dos manzanas en total.",
      opciones: rutasEjemplo.slice(0, variante.rutas),
    },
  ];
}

export function manifiestoProvisional(): ManifiestoContenido {
  return {
    contentVersion: VERSION_EJEMPLO,
    aviso: { ...AVISO },
    misiones: [
      {
        id: ID_MISION_EJEMPLO,
        titulo: "Misión de ensayo: preparar una muestra",
        premisa:
          "Ayudas a preparar una pequeña muestra sobre la zona: primero revisas fichas y después " +
          "eliges un recorrido. Todo el material es de ejemplo.",
        gradosDisponibles: [1, 2, 3, 4, 5],
      },
    ],
  };
}

export function misionProvisional(grado: Grado): Mision {
  return {
    id: ID_MISION_EJEMPLO,
    contentVersion: VERSION_EJEMPLO,
    aviso: { ...AVISO },
    titulo: "Misión de ensayo: preparar una muestra",
    premisa:
      "Ayudas a preparar una pequeña muestra sobre la zona de ensayo. Primero revisas las fichas " +
      "disponibles y después eliges un recorrido para la visita.",
    grado,
    zona: zonaEjemplo,
    personajes: [
      {
        id: "guia-orientacion",
        nombre: "Guía de ensayo",
        funcion: "orientacion",
        textoAlternativoRetrato: "",
        lineas: [
          "Hola. Este personaje es un marcador de prototipo: no tiene nombre, historia ni voz definidos.",
          "Tu tarea de ensayo tiene dos partes: revisar fichas y elegir un recorrido en el esquema.",
          "Puedes pedir una pista, pausar o salir cuando quieras. No hay penalización.",
        ],
      },
      {
        id: "guia-contexto",
        nombre: "Apoyo de fichas",
        funcion: "contexto",
        textoAlternativoRetrato: "",
        lineas: [
          "Cada ficha declara quién la escribió, cuándo y de dónde viene. Ese es el dato que importa.",
          "Si una ficha no declara su procedencia, no alcanza para dar algo por cerrado.",
        ],
      },
    ],
    instrucciones: {
      objetivo: "Revisar las fichas de ejemplo y elegir un recorrido que cumpla la condición indicada.",
      pasos: [
        "Lee las fichas y fíjate en qué declara cada una.",
        "Elige la afirmación que queda respaldada por esas fichas.",
        "Mira el esquema y elige el recorrido que cumple la condición.",
        "Si algo no queda claro, pide una pista y vuelve a intentarlo.",
      ],
      controlesTeclado: [
        "Tabulador y Mayúsculas+Tabulador recorren los controles de la pantalla.",
        "Flechas se mueven entre los puntos del esquema y entre las opciones de un reto.",
        "Entrar o Barra espaciadora activan el control que tiene el foco.",
        "Escape cierra un panel abierto y devuelve el foco donde estaba.",
      ],
      controlesTactiles: [
        "Toca un punto del esquema para ver su descripción.",
        "Toca una opción para marcarla; se confirma con el botón de responder.",
        "La lista de puntos hace lo mismo que el esquema, sin necesidad de precisión.",
      ],
    },
    retos: retosEjemplo(grado),
    cierre: {
      titulo: "Fin del recorrido de ensayo",
      mensaje:
        "Terminaste la misión de ejemplo. Lo que viste es material de prueba de la interfaz, no un " +
        "resultado sobre tu aprendizaje.",
      notaRecompensa:
        "Los puntos de juego son solo una recompensa de la partida: no son una nota, un porcentaje " +
        "de dominio ni una medida de lo que aprendiste.",
    },
  };
}

/** Veredicto de andamio. El backend lo reemplaza; aquí solo ejercita los estados. */
export function veredictoProvisional(solicitud: SolicitudIntento): Veredicto {
  const esperadas = OPCIONES_RESPALDADAS[solicitud.retoId] ?? [];
  const elegidas = solicitud.opcionesSeleccionadas;

  if (elegidas.length === 0) {
    return {
      retoId: solicitud.retoId,
      resultado: "incompleta",
      mensaje: "Todavía no hay una opción marcada.",
      criterio: "Marca una opción y vuelve a responder. Puedes cambiarla después.",
      puedeReintentar: true,
    };
  }

  const coincide =
    elegidas.length === esperadas.length && esperadas.every((id) => elegidas.includes(id));

  if (coincide) {
    return {
      retoId: solicitud.retoId,
      resultado: "con_evidencia",
      mensaje:
        solicitud.retoId === "reto-fuentes"
          ? "Tu elección se apoya en la ficha que declara autoría, fecha y localizador."
          : "El recorrido que elegiste cumple la condición de manzanas indicada.",
      criterio:
        solicitud.retoId === "reto-fuentes"
          ? "En el andamio, la ficha B es la única con procedencia completa."
          : "En el andamio, el recorrido directo suma dos manzanas y llega al punto este.",
      puedeReintentar: true,
      xpJuego: 10,
    };
  }

  return {
    retoId: solicitud.retoId,
    resultado: "evidencia_insuficiente",
    mensaje:
      solicitud.retoId === "reto-fuentes"
        ? "Esa afirmación aún no queda respaldada por lo que muestran las fichas."
        : "Ese recorrido no cumple la condición de manzanas.",
    criterio:
      solicitud.retoId === "reto-fuentes"
        ? "Revisa qué declara cada ficha sobre autoría, fecha y localizador."
        : "Compara cuántas manzanas suma cada recorrido antes de decidir.",
    puedeReintentar: true,
  };
}

/** Pistas de andamio, con opciones cerradas y sin llamadas a un proveedor externo. */
export function ayudaProvisional(solicitud: SolicitudAyuda): Ayuda {
  const pistas: Record<string, string[]> = {
    "reto-fuentes": [
      "Fíjate en qué ficha declara autoría, fecha y localizador, y qué ficha deja campos vacíos.",
      "Una ficha que contradice a otra no alcanza por sí sola: eso deja el dato en duda.",
    ],
    "reto-ruta": [
      "Cuenta las manzanas de cada recorrido antes de elegir; la condición pone un máximo.",
      "Un recorrido directo puede sumar menos manzanas que uno que pasa por más puntos.",
    ],
  };
  const disponibles = pistas[solicitud.retoId] ?? [
    "Vuelve a leer la instrucción del reto y las fichas antes de responder.",
  ];
  const indice = Math.min(solicitud.ayudasConsumidas, disponibles.length - 1);

  return {
    retoId: solicitud.retoId,
    tipo: "pista",
    texto: disponibles[indice],
    origen: "simulada",
  };
}
