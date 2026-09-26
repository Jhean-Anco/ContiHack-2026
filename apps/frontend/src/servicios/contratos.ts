/**
 * Contratos de transporte que la interfaz espera recibir del API Nest.
 *
 * Estos tipos describen JSON de frontera, no el modelo de dominio del backend y
 * no sustituyen la validación del servidor. Codex es la autoridad del contrato:
 * si el endpoint real difiere, se corrige aquí y se ajusta el render.
 *
 * Referencias: docs/05-arquitectura/api.md, docs/03-contenido/modelo-contenido.md.
 */

export type Grado = 1 | 2 | 3 | 4 | 5;

export const GRADOS: readonly Grado[] = [1, 2, 3, 4, 5];

/** Estado de verificación de una fuente. El cliente lo muestra, no lo decide. */
export type EstadoProvenance = "verificada" | "pendiente_de_validacion";

/** Función narrativa del personaje. No implica cantidad ni reparto decidido. */
export type FuncionPersonaje = "orientacion" | "contexto" | "cierre";

export interface AvisoContenido {
  /** true mientras el catálogo servido sea de ejemplo y no contenido aprobado. */
  esEjemploFicticio: boolean;
  /** Texto que la interfaz muestra de forma permanente junto al contenido. */
  texto: string;
}

export interface ResumenMision {
  id: string;
  titulo: string;
  premisa: string;
  gradosDisponibles: Grado[];
}

export interface ManifiestoContenido {
  contentVersion: string;
  aviso: AvisoContenido;
  misiones: ResumenMision[];
}

export interface PuntoZona {
  id: string;
  nombre: string;
  /** Alternativa textual del punto; sirve al mapa y a la lista equivalente. */
  descripcion: string;
  /** Coordenadas del esquema, 0–100. No son geografía ni escala real. */
  x: number;
  y: number;
  /** Manzanas recorridas desde el ancla según el plano de referencia del contenido. */
  manzanasDesdeAncla: number;
  esAncla: boolean;
}

export interface TramoZona {
  desde: string;
  hacia: string;
  manzanas: number;
}

export interface Zona {
  id: string;
  nombre: string;
  /** Descripción que reemplaza al dibujo cuando el mapa no es utilizable. */
  descripcionAlternativa: string;
  anclaId: string;
  puntos: PuntoZona[];
  tramos: TramoZona[];
}

export interface Personaje {
  id: string;
  nombre: string;
  funcion: FuncionPersonaje;
  /** Texto alternativo del retrato; vacío si la ilustración es decorativa. */
  textoAlternativoRetrato: string;
  lineas: string[];
}

export interface Instrucciones {
  objetivo: string;
  pasos: string[];
  controlesTeclado: string[];
  controlesTactiles: string[];
}

export interface TarjetaFuente {
  id: string;
  titulo: string;
  autoria: string;
  fecha: string;
  contexto: string;
  fragmento: string;
  estadoProvenance: EstadoProvenance;
  localizador?: string;
  /** Advertencia editorial cuando la fuente tiene datos en disputa. */
  nota?: string;
}

export interface OpcionReto {
  id: string;
  etiqueta: string;
  detalle?: string;
}

export interface OpcionRuta extends OpcionReto {
  /** IDs de puntos de la zona, en orden de recorrido. */
  puntos: string[];
  manzanasTotales: number;
}

interface RetoBase {
  id: string;
  titulo: string;
  instruccion: string;
  /** Cuántas ayudas declara el catálogo para este reto. */
  ayudasDisponibles: number;
}

export interface RetoFuentes extends RetoBase {
  tipo: "fuentes";
  fuentes: TarjetaFuente[];
  opciones: OpcionReto[];
  seleccionMultiple: boolean;
}

export interface RetoRuta extends RetoBase {
  tipo: "ruta";
  zonaId: string;
  condicion: string;
  opciones: OpcionRuta[];
}

export type Reto = RetoFuentes | RetoRuta;

export interface Cierre {
  titulo: string;
  mensaje: string;
  /** Aclaración obligatoria de que XP no mide aprendizaje. */
  notaRecompensa: string;
}

export interface Mision {
  id: string;
  contentVersion: string;
  aviso: AvisoContenido;
  titulo: string;
  premisa: string;
  grado: Grado;
  zona: Zona;
  personajes: Personaje[];
  instrucciones: Instrucciones;
  retos: Reto[];
  cierre: Cierre;
}

/**
 * Veredicto del servidor. El cliente nunca lo calcula.
 * `resultado` evita el lenguaje de calificación: describe si la selección
 * quedó respaldada por la evidencia mostrada o qué falta.
 */
export type ResultadoIntento = "con_evidencia" | "evidencia_insuficiente" | "incompleta";

export interface Veredicto {
  retoId: string;
  resultado: ResultadoIntento;
  /** Explicación dirigida al estudiante. */
  mensaje: string;
  /** Criterio o evidencia que sustenta la explicación. */
  criterio: string;
  puedeReintentar: boolean;
  /** Recompensa de juego, nunca indicador de aprendizaje. Puede no existir. */
  xpJuego?: number;
}

export interface Ayuda {
  retoId: string;
  tipo: "pista" | "dialogo";
  texto: string;
  /** Distingue ayuda local de una respuesta simulada o generada por Gemini. */
  origen: "catalogo" | "simulada" | "gemini";
}

export interface SolicitudIntento {
  misionId: string;
  retoId: string;
  grado: Grado;
  /** IDs de opción seleccionados. Sin texto libre del estudiante. */
  opcionesSeleccionadas: string[];
}

export interface SolicitudAyuda {
  misionId: string;
  retoId: string;
  grado: Grado;
  /** Ayudas ya consultadas en este reto, para que el servidor elija la siguiente. */
  ayudasConsumidas: number;
  opcionesSeleccionadas: string[];
}
