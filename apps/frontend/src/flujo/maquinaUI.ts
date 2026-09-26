/**
 * Máquina de navegación de la interfaz.
 *
 * Decide **qué se ve**: pantalla activa, panel abierto, opción marcada, si hay una
 * petición en curso y qué se anuncia a lectores de pantalla. No decide si una
 * respuesta tiene evidencia, ni cuánto XP corresponde, ni qué pista toca: eso llega
 * del servidor a través de `servicios/clienteContenido`.
 *
 * Todo el estado vive en memoria. Recargar o salir reinicia la misión, tal como
 * declara docs/05-arquitectura/estados-eventos.md.
 */

import type { Ayuda, Grado, Mision, Reto, Veredicto } from "@/servicios/contratos";

export type Paso =
  | "entrada"
  | "grado"
  | "instrucciones"
  | "mapa"
  | "contexto"
  | "reto"
  | "feedback"
  | "cierre";

export type Panel = "ninguno" | "pausa" | "ayuda" | "controles";

export type EstadoCarga = "inactivo" | "cargando" | "listo" | "vacio" | "error";

export interface EstadoFlujo {
  paso: Paso;
  carga: EstadoCarga;
  mensajeError: string | null;
  mision: Mision | null;
  /** Grado marcado en el selector; se conserva solo en memoria de la sesión. */
  gradoMarcado: Grado | null;
  indiceReto: number;
  /** IDs de opción marcados en el reto visible. */
  seleccion: string[];
  panel: Panel;
  enviando: boolean;
  veredicto: Veredicto | null;
  ayudaVisible: Ayuda | null;
  pidiendoAyuda: boolean;
  /** Ayudas consultadas por reto, para que el servidor elija la siguiente. */
  ayudasConsumidas: Record<string, number>;
  /** Recompensa de juego acumulada en la sesión. No mide aprendizaje. */
  xpJuego: number;
  /** Texto para la región de anuncios; cambia en cada transición relevante. */
  anuncio: string;
}

export type EventoFlujo =
  | { tipo: "comenzar" }
  | { tipo: "marcarGrado"; grado: Grado }
  | { tipo: "confirmarGrado" }
  | { tipo: "volverAGrado" }
  | { tipo: "cargaIniciada" }
  | { tipo: "cargaLista"; mision: Mision }
  | { tipo: "cargaFallida"; mensaje: string }
  | { tipo: "catalogoVacio"; mensaje: string }
  | { tipo: "irA"; paso: Extract<Paso, "instrucciones" | "mapa" | "contexto" | "reto"> }
  | { tipo: "marcarOpcion"; id: string; multiple: boolean }
  | { tipo: "intentoEnviado" }
  | { tipo: "veredictoRecibido"; veredicto: Veredicto }
  | { tipo: "intentoFallido"; mensaje: string }
  | { tipo: "reintentar" }
  | { tipo: "continuar" }
  | { tipo: "abrirPanel"; panel: Exclude<Panel, "ninguno"> }
  | { tipo: "cerrarPanel" }
  | { tipo: "ayudaSolicitada" }
  | { tipo: "ayudaRecibida"; ayuda: Ayuda }
  | { tipo: "ayudaFallida"; mensaje: string }
  | { tipo: "descartarError" }
  | { tipo: "reiniciar" };

export const estadoInicial: EstadoFlujo = {
  paso: "entrada",
  carga: "inactivo",
  mensajeError: null,
  mision: null,
  gradoMarcado: null,
  indiceReto: 0,
  seleccion: [],
  panel: "ninguno",
  enviando: false,
  veredicto: null,
  ayudaVisible: null,
  pidiendoAyuda: false,
  ayudasConsumidas: {},
  xpJuego: 0,
  anuncio: "",
};

export function retoActual(estado: EstadoFlujo): Reto | null {
  return estado.mision?.retos[estado.indiceReto] ?? null;
}

export function esUltimoReto(estado: EstadoFlujo): boolean {
  if (!estado.mision) return true;
  return estado.indiceReto >= estado.mision.retos.length - 1;
}

export function ayudasRestantes(estado: EstadoFlujo): number {
  const reto = retoActual(estado);
  if (!reto) return 0;
  return Math.max(0, reto.ayudasDisponibles - (estado.ayudasConsumidas[reto.id] ?? 0));
}

function anuncioPaso(paso: Paso, estado: EstadoFlujo): string {
  switch (paso) {
    case "grado":
      return "Selección de grado. Elige un grado para ver su variante de la misión.";
    case "instrucciones":
      return "Instrucciones y controles de la misión.";
    case "mapa":
      return "Esquema de la zona. Puedes usar el esquema o la lista equivalente de puntos.";
    case "contexto":
      return "Contexto de la misión y fichas disponibles.";
    case "reto": {
      const reto = retoActual(estado);
      return reto ? `Reto: ${reto.titulo}. ${reto.instruccion}` : "Reto en pantalla.";
    }
    case "feedback":
      return "Respuesta recibida. Revisa la explicación antes de continuar.";
    case "cierre":
      return "Cierre de la misión.";
    default:
      return "";
  }
}

export function reducir(estado: EstadoFlujo, evento: EventoFlujo): EstadoFlujo {
  switch (evento.tipo) {
    case "comenzar":
      return { ...estado, paso: "grado", anuncio: anuncioPaso("grado", estado) };

    case "marcarGrado":
      return { ...estado, gradoMarcado: evento.grado };

    case "confirmarGrado":
      if (estado.gradoMarcado === null) {
        return {
          ...estado,
          mensajeError: "Elige un grado para continuar.",
          anuncio: "Falta elegir un grado.",
        };
      }
      return { ...estado, mensajeError: null, paso: "instrucciones" };

    case "volverAGrado":
      return {
        ...estado,
        paso: "grado",
        carga: "inactivo",
        mision: null,
        indiceReto: 0,
        seleccion: [],
        veredicto: null,
        ayudaVisible: null,
        ayudasConsumidas: {},
        panel: "ninguno",
        mensajeError: null,
        anuncio: anuncioPaso("grado", estado),
      };

    case "cargaIniciada":
      return { ...estado, carga: "cargando", mensajeError: null, anuncio: "Cargando la misión." };

    case "cargaLista": {
      const siguiente: EstadoFlujo = {
        ...estado,
        carga: "listo",
        mision: evento.mision,
        mensajeError: null,
      };
      return { ...siguiente, anuncio: anuncioPaso(estado.paso, siguiente) };
    }

    case "cargaFallida":
      return { ...estado, carga: "error", mensajeError: evento.mensaje, anuncio: evento.mensaje };

    case "catalogoVacio":
      return { ...estado, carga: "vacio", mensajeError: evento.mensaje, anuncio: evento.mensaje };

    case "irA": {
      const siguiente: EstadoFlujo = {
        ...estado,
        paso: evento.paso,
        panel: "ninguno",
        mensajeError: null,
      };
      return { ...siguiente, anuncio: anuncioPaso(evento.paso, siguiente) };
    }

    case "marcarOpcion": {
      if (!evento.multiple) {
        return { ...estado, seleccion: [evento.id], mensajeError: null };
      }
      const yaEstaba = estado.seleccion.includes(evento.id);
      return {
        ...estado,
        seleccion: yaEstaba
          ? estado.seleccion.filter((id) => id !== evento.id)
          : [...estado.seleccion, evento.id],
        mensajeError: null,
      };
    }

    case "intentoEnviado":
      return { ...estado, enviando: true, mensajeError: null, anuncio: "Enviando tu respuesta." };

    case "veredictoRecibido": {
      const siguiente: EstadoFlujo = {
        ...estado,
        enviando: false,
        veredicto: evento.veredicto,
        xpJuego: estado.xpJuego + (evento.veredicto.xpJuego ?? 0),
        paso: "feedback",
        panel: "ninguno",
      };
      return { ...siguiente, anuncio: `${evento.veredicto.mensaje} ${evento.veredicto.criterio}` };
    }

    case "intentoFallido":
      return { ...estado, enviando: false, mensajeError: evento.mensaje, anuncio: evento.mensaje };

    case "reintentar": {
      const siguiente: EstadoFlujo = { ...estado, paso: "reto", veredicto: null, mensajeError: null };
      return { ...siguiente, anuncio: anuncioPaso("reto", siguiente) };
    }

    case "continuar": {
      if (esUltimoReto(estado)) {
        return {
          ...estado,
          paso: "cierre",
          veredicto: null,
          ayudaVisible: null,
          anuncio: anuncioPaso("cierre", estado),
        };
      }
      const siguiente: EstadoFlujo = {
        ...estado,
        indiceReto: estado.indiceReto + 1,
        seleccion: [],
        veredicto: null,
        ayudaVisible: null,
        paso: "reto",
      };
      return { ...siguiente, anuncio: anuncioPaso("reto", siguiente) };
    }

    case "abrirPanel":
      return { ...estado, panel: evento.panel };

    case "cerrarPanel":
      return { ...estado, panel: "ninguno" };

    case "ayudaSolicitada":
      return { ...estado, pidiendoAyuda: true, panel: "ayuda", anuncio: "Buscando una pista." };

    case "ayudaRecibida": {
      const consumidas = (estado.ayudasConsumidas[evento.ayuda.retoId] ?? 0) + 1;
      return {
        ...estado,
        pidiendoAyuda: false,
        ayudaVisible: evento.ayuda,
        panel: "ayuda",
        ayudasConsumidas: { ...estado.ayudasConsumidas, [evento.ayuda.retoId]: consumidas },
        anuncio: `Pista: ${evento.ayuda.texto}`,
      };
    }

    case "ayudaFallida":
      return {
        ...estado,
        pidiendoAyuda: false,
        panel: "ninguno",
        mensajeError: evento.mensaje,
        anuncio: evento.mensaje,
      };

    case "descartarError":
      return { ...estado, mensajeError: null };

    case "reiniciar":
      return { ...estadoInicial, anuncio: "La misión se reinició desde el inicio." };

    default: {
      const exhaustivo: never = evento;
      return exhaustivo;
    }
  }
}
