/**
 * Puerto único por el que la interfaz obtiene contenido y veredictos.
 *
 * La pantalla nunca decide si una respuesta tiene evidencia: lo pregunta aquí.
 * Hoy existen dos implementaciones del mismo puerto:
 *
 * - `clienteHttp`: consume el API Nest descrito en docs/05-arquitectura/api.md,
 *   transforma la misión y valida lo recibido antes de devolverlo.
 * - `clienteProvisional`: andamio de interfaz disponible cuando no se desea API.
 *
 * `NEXT_PUBLIC_CONTENIDO_ORIGEN=http` selecciona HTTP. Compose usa este valor.
 */

import {
  ayudaProvisional,
  manifiestoProvisional,
  misionProvisional,
  veredictoProvisional,
} from "./datosProvisionales";
import type {
  Ayuda,
  Grado,
  ManifiestoContenido,
  Mision,
  SolicitudAyuda,
  SolicitudIntento,
  Veredicto,
} from "./contratos";
import { ErrorContenido, leerAyuda, leerManifiesto, leerMision, leerVeredicto } from "./validacion";
import { gameApi, type MisionJuego } from "@/features/game/game-api";

function convertirMision(juego: MisionJuego): Mision {
  const plazaId = "ancla-plaza-constitucion";
  const destinoId = "destino-practica";
  const retoFuentes = juego.variant.challenges.find((reto) => reto.id === "fuentes");
  const retoRuta = juego.variant.challenges.find((reto) => reto.id === "recorrido");
  if (!retoFuentes || !retoRuta) throw new ErrorContenido("mision.variant.challenges");

  const longitudRuta = (id: string) => {
    const opcion = retoRuta.options.find((item) => item.id === id);
    const longitud = opcion?.label.match(/(\d+)\s+tramos/);
    if (!opcion || !longitud) throw new ErrorContenido(`mision.ruta.${id}`);
    return { opcion, longitud: Number(longitud[1]) };
  };
  const rutas = retoRuta.options.filter((item) => item.id.startsWith("ruta-")).map((item) => {
    const longitud = longitudRuta(item.id).longitud;
    const puntosIntermedios = Array.from({ length: Math.max(0, longitud - 1) }, (_, index) =>
      `${item.id}-tramo-${index + 1}`,
    );
    return {
      id: item.id,
      puntosIntermedios,
      longitud,
      puntos: [plazaId, ...puntosIntermedios, destinoId],
    };
  });
  const puntosZona = [
    { id: plazaId, nombre: "Plaza Constitución (ancla del esquema)", descripcion: "Punto de inicio ilustrativo; no es un plano geográfico.", x: 50, y: 92, manzanasDesdeAncla: 0, esAncla: true },
    ...rutas.flatMap((ruta, routeIndex) => ruta.puntosIntermedios.map((id, index) => ({
      id,
      nombre: `Punto esquemático ${routeIndex + 1}.${index + 1}`,
      descripcion: "Nodo ficticio de un ejercicio de recorrido.",
      x: routeIndex === 0 ? 25 : 75,
      y: 84 - ((index + 1) * 68) / ruta.longitud,
      manzanasDesdeAncla: index + 1,
      esAncla: false,
    }))),
    { id: destinoId, nombre: "Punto de práctica", descripcion: "Destino ficticio compartido por las rutas.", x: 50, y: 12, manzanasDesdeAncla: Math.min(...rutas.map((ruta) => ruta.longitud)), esAncla: false },
  ];
  const tramosZona = rutas.flatMap((ruta) => ruta.puntos.slice(0, -1).map((desde, index) => ({
    desde,
    hacia: ruta.puntos[index + 1],
    manzanas: 1,
  })));

  const retos = [
    {
      id: retoFuentes.id,
      tipo: "fuentes" as const,
      titulo: retoFuentes.title,
      instruccion: retoFuentes.prompt,
      ayudasDisponibles: 2,
      fuentes: juego.variant.historyCards.map((card) => ({
        id: card.id,
        titulo: card.title,
        autoria: "Material sintético del prototipo",
        fecha: card.text.match(/(\d{4})\./)?.[1] ?? "Fecha ficticia",
        contexto: "Ficha demostrativa sin vínculo con la historia de Huancayo.",
        fragmento: card.text,
        estadoProvenance: "pendiente_de_validacion" as const,
        nota: "Dato inventado para probar la interacción; no es una fuente histórica.",
      })),
      opciones: retoFuentes.options.map((option) => ({ id: option.id, etiqueta: option.label })),
      seleccionMultiple: false,
    },
    {
      id: retoRuta.id,
      tipo: "ruta" as const,
      titulo: retoRuta.title,
      instruccion: retoRuta.prompt,
      ayudasDisponibles: 2,
      zonaId: "zona-esquematica-pmv",
      condicion: "Compara los tramos ilustrativos y respeta el máximo de cuatro; no representa calles ni distancias reales.",
      opciones: rutas.map((ruta) => {
        const opcion = retoRuta.options.find((item) => item.id === ruta.id)!;
        return { id: ruta.id, etiqueta: opcion.label, puntos: ruta.puntos, manzanasTotales: ruta.longitud };
      }),
    },
  ];

  return leerMision({
    id: juego.id,
    contentVersion: juego.contentVersion,
    aviso: { esEjemploFicticio: true, texto: `${juego.location.note} Las fichas y sus fechas son inventadas.` },
    titulo: juego.title,
    premisa: juego.description,
    grado: juego.variant.grade,
    zona: {
      id: "zona-esquematica-pmv",
      nombre: "Esquema de recorridos de práctica",
      descripcionAlternativa: "El esquema parte de Plaza Constitución y conecta nodos ficticios; no representa calles reales.",
      anclaId: plazaId,
      puntos: puntosZona,
      tramos: tramosZona,
    },
    personajes: [],
    instrucciones: {
      objetivo: "Contrasta las fichas ficticias y compara dos recorridos esquemáticos.",
      pasos: ["Elige una opción para cada reto.", "Puedes pedir una pista acotada.", "El servidor verifica tu selección."],
      controlesTeclado: ["Tab para cambiar de control", "Enter o Espacio para activar una opción"],
      controlesTactiles: ["Toca una opción para seleccionarla", "Toca el control para confirmar"],
    },
    retos,
    cierre: {
      titulo: "Fin de la misión de práctica",
      mensaje: "Has recorrido los retos de demostración.",
      notaRecompensa: "Este prototipo no registra progreso ni mide aprendizaje.",
    },
  });
}

export class ErrorServicio extends Error {
  constructor(
    message: string,
    /** Sugerencia de recuperación que la interfaz puede mostrar. */
    public readonly recuperable: boolean = true,
  ) {
    super(message);
    this.name = "ErrorServicio";
  }
}

export interface ClienteContenido {
  obtenerManifiesto(senal?: AbortSignal): Promise<ManifiestoContenido>;
  obtenerMision(misionId: string, grado: Grado, senal?: AbortSignal): Promise<Mision>;
  enviarIntento(solicitud: SolicitudIntento, senal?: AbortSignal): Promise<Veredicto>;
  pedirAyuda(solicitud: SolicitudAyuda, senal?: AbortSignal): Promise<Ayuda>;
}

const BASE_API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function pedir(ruta: string, opciones: RequestInit, senal?: AbortSignal): Promise<unknown> {
  let respuesta: Response;
  try {
    respuesta = await fetch(`${BASE_API}${ruta}`, {
      ...opciones,
      signal: senal,
      headers: { Accept: "application/json", ...(opciones.headers ?? {}) },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ErrorServicio("No se pudo conectar con el servicio del juego.");
  }

  if (!respuesta.ok) {
    // No se muestra el cuerpo del error: puede traer detalle técnico que no corresponde en pantalla.
    throw new ErrorServicio(
      respuesta.status >= 500
        ? "El servicio del juego respondió con un error."
        : "El servicio del juego no encontró ese contenido.",
      respuesta.status >= 500,
    );
  }

  try {
    return (await respuesta.json()) as unknown;
  } catch {
    throw new ErrorServicio("La respuesta del servicio no se pudo leer.");
  }
}

export const clienteHttp: ClienteContenido = {
  async obtenerManifiesto(senal) {
    const raw = await pedir("/api/content/manifest", { method: "GET" }, senal) as {
      contentVersion: string; editorialStatus: "synthetic-demo";
      missions: Array<{ id: string; title: string; grades: Grado[] }>;
    };
    return leerManifiesto({
      contentVersion: raw.contentVersion,
      aviso: { esEjemploFicticio: true, texto: "Contenido demostrativo con datos inventados; no es historia local validada." },
      misiones: raw.missions.map((mission) => ({
        id: mission.id,
        titulo: mission.title,
        premisa: "Ejercicio sintético de fuentes y recorridos.",
        gradosDisponibles: mission.grades,
      })),
    });
  },
  async obtenerMision(misionId, grado, senal) {
    try {
      return convertirMision(await gameApi.getMission(misionId, grado, senal));
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") throw error;
      throw new ErrorServicio("No se pudo cargar la misión.");
    }
  },
  async enviarIntento(solicitud, senal) {
    if (solicitud.opcionesSeleccionadas.length !== 1) throw new ErrorServicio("Selecciona una sola opción.", false);
    const challengeId = solicitud.retoId === "recorrido" ? "recorrido" : "fuentes";
    const result = await gameApi.submitAnswer({
      grade: solicitud.grado,
      challengeId,
      optionId: solicitud.opcionesSeleccionadas[0],
    }, senal);
    return leerVeredicto({
      retoId: solicitud.retoId,
      resultado: result.correct ? "con_evidencia" : "evidencia_insuficiente",
      mensaje: result.feedback,
      criterio: "Respuesta contrastada por reglas deterministas del servidor con material sintético.",
      puedeReintentar: !result.correct,
    });
  },
  async pedirAyuda(solicitud, senal) {
    const optionId = solicitud.opcionesSeleccionadas[0];
    if (!optionId) throw new ErrorServicio("Marca una opción para pedir una pista.", false);
    const challengeId = solicitud.retoId === "recorrido" ? "recorrido" : "fuentes";
    const result = await gameApi.requestAssistance({ grade: solicitud.grado, challengeId, optionId, kind: "hint" }, senal);
    return leerAyuda({
      retoId: solicitud.retoId,
      tipo: "pista",
      texto: result.text,
      origen: result.provider === "gemini" ? "gemini" : result.reason === "mock" ? "catalogo" : "simulada",
    });
  },
};

/** Espera corta para que los estados de carga se puedan ver y probar. */
function demora(ms: number, senal?: AbortSignal): Promise<void> {
  return new Promise((resolver, rechazar) => {
    if (senal?.aborted) {
      rechazar(new DOMException("Cancelado", "AbortError"));
      return;
    }
    const temporizador = setTimeout(() => {
      senal?.removeEventListener("abort", cancelar);
      resolver();
    }, ms);
    function cancelar() {
      clearTimeout(temporizador);
      rechazar(new DOMException("Cancelado", "AbortError"));
    }
    senal?.addEventListener("abort", cancelar, { once: true });
  });
}

export const clienteProvisional: ClienteContenido = {
  async obtenerManifiesto(senal) {
    await demora(180, senal);
    return leerManifiesto(manifiestoProvisional());
  },
  async obtenerMision(_misionId, grado, senal) {
    await demora(280, senal);
    return leerMision(misionProvisional(grado));
  },
  async enviarIntento(solicitud, senal) {
    await demora(260, senal);
    return leerVeredicto(veredictoProvisional(solicitud));
  },
  async pedirAyuda(solicitud, senal) {
    await demora(220, senal);
    return leerAyuda(ayudaProvisional(solicitud));
  },
};

export const usaContenidoProvisional = process.env.NEXT_PUBLIC_CONTENIDO_ORIGEN !== "http";

export const clienteContenido: ClienteContenido = usaContenidoProvisional
  ? clienteProvisional
  : clienteHttp;
