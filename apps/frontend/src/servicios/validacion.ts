/**
 * Estrechamiento de datos externos antes de renderizarlos.
 *
 * Es una defensa de la interfaz frente a JSON inesperado, no la validación del
 * sistema: el servidor sigue siendo responsable de validar y de servir solo
 * contenido publicable (docs/05-arquitectura/frontend.md).
 */

import {
  GRADOS,
  type AvisoContenido,
  type Ayuda,
  type Cierre,
  type Grado,
  type Instrucciones,
  type ManifiestoContenido,
  type Mision,
  type OpcionReto,
  type OpcionRuta,
  type Personaje,
  type PuntoZona,
  type Reto,
  type ResumenMision,
  type TarjetaFuente,
  type TramoZona,
  type Veredicto,
  type Zona,
} from "./contratos";

export class ErrorContenido extends Error {
  constructor(public readonly campo: string) {
    super(`El contenido recibido no tiene la forma esperada (${campo}).`);
    this.name = "ErrorContenido";
  }
}

function objeto(valor: unknown, campo: string): Record<string, unknown> {
  if (typeof valor !== "object" || valor === null || Array.isArray(valor)) {
    throw new ErrorContenido(campo);
  }
  return valor as Record<string, unknown>;
}

function texto(valor: unknown, campo: string): string {
  if (typeof valor !== "string" || valor.trim() === "") throw new ErrorContenido(campo);
  return valor;
}

function textoOpcional(valor: unknown, campo: string): string | undefined {
  if (valor === undefined || valor === null) return undefined;
  return texto(valor, campo);
}

function numero(valor: unknown, campo: string): number {
  if (typeof valor !== "number" || !Number.isFinite(valor)) throw new ErrorContenido(campo);
  return valor;
}

function numeroOpcional(valor: unknown, campo: string): number | undefined {
  if (valor === undefined || valor === null) return undefined;
  return numero(valor, campo);
}

function booleano(valor: unknown, campo: string): boolean {
  if (typeof valor !== "boolean") throw new ErrorContenido(campo);
  return valor;
}

function lista(valor: unknown, campo: string): unknown[] {
  if (!Array.isArray(valor)) throw new ErrorContenido(campo);
  return valor;
}

function listaTextos(valor: unknown, campo: string): string[] {
  return lista(valor, campo).map((item, i) => texto(item, `${campo}[${i}]`));
}

function unaDe<T extends string>(valor: unknown, permitidos: readonly T[], campo: string): T {
  const candidato = texto(valor, campo);
  if (!permitidos.includes(candidato as T)) throw new ErrorContenido(campo);
  return candidato as T;
}

export function esGrado(valor: unknown): valor is Grado {
  return typeof valor === "number" && (GRADOS as readonly number[]).includes(valor);
}

function grado(valor: unknown, campo: string): Grado {
  if (!esGrado(valor)) throw new ErrorContenido(campo);
  return valor;
}

function aviso(valor: unknown, campo: string): AvisoContenido {
  const bruto = objeto(valor, campo);
  return {
    esEjemploFicticio: booleano(bruto.esEjemploFicticio, `${campo}.esEjemploFicticio`),
    texto: texto(bruto.texto, `${campo}.texto`),
  };
}

function punto(valor: unknown, campo: string): PuntoZona {
  const bruto = objeto(valor, campo);
  return {
    id: texto(bruto.id, `${campo}.id`),
    nombre: texto(bruto.nombre, `${campo}.nombre`),
    descripcion: texto(bruto.descripcion, `${campo}.descripcion`),
    x: numero(bruto.x, `${campo}.x`),
    y: numero(bruto.y, `${campo}.y`),
    manzanasDesdeAncla: numero(bruto.manzanasDesdeAncla, `${campo}.manzanasDesdeAncla`),
    esAncla: booleano(bruto.esAncla, `${campo}.esAncla`),
  };
}

function tramo(valor: unknown, campo: string): TramoZona {
  const bruto = objeto(valor, campo);
  return {
    desde: texto(bruto.desde, `${campo}.desde`),
    hacia: texto(bruto.hacia, `${campo}.hacia`),
    manzanas: numero(bruto.manzanas, `${campo}.manzanas`),
  };
}

function zona(valor: unknown, campo: string): Zona {
  const bruto = objeto(valor, campo);
  const puntos = lista(bruto.puntos, `${campo}.puntos`).map((p, i) => punto(p, `${campo}.puntos[${i}]`));
  if (puntos.length === 0) throw new ErrorContenido(`${campo}.puntos`);
  return {
    id: texto(bruto.id, `${campo}.id`),
    nombre: texto(bruto.nombre, `${campo}.nombre`),
    descripcionAlternativa: texto(bruto.descripcionAlternativa, `${campo}.descripcionAlternativa`),
    anclaId: texto(bruto.anclaId, `${campo}.anclaId`),
    puntos,
    tramos: lista(bruto.tramos, `${campo}.tramos`).map((t, i) => tramo(t, `${campo}.tramos[${i}]`)),
  };
}

function personaje(valor: unknown, campo: string): Personaje {
  const bruto = objeto(valor, campo);
  return {
    id: texto(bruto.id, `${campo}.id`),
    nombre: texto(bruto.nombre, `${campo}.nombre`),
    funcion: unaDe(bruto.funcion, ["orientacion", "contexto", "cierre"] as const, `${campo}.funcion`),
    textoAlternativoRetrato:
      typeof bruto.textoAlternativoRetrato === "string" ? bruto.textoAlternativoRetrato : "",
    lineas: listaTextos(bruto.lineas, `${campo}.lineas`),
  };
}

function instrucciones(valor: unknown, campo: string): Instrucciones {
  const bruto = objeto(valor, campo);
  return {
    objetivo: texto(bruto.objetivo, `${campo}.objetivo`),
    pasos: listaTextos(bruto.pasos, `${campo}.pasos`),
    controlesTeclado: listaTextos(bruto.controlesTeclado, `${campo}.controlesTeclado`),
    controlesTactiles: listaTextos(bruto.controlesTactiles, `${campo}.controlesTactiles`),
  };
}

function fuente(valor: unknown, campo: string): TarjetaFuente {
  const bruto = objeto(valor, campo);
  return {
    id: texto(bruto.id, `${campo}.id`),
    titulo: texto(bruto.titulo, `${campo}.titulo`),
    autoria: texto(bruto.autoria, `${campo}.autoria`),
    fecha: texto(bruto.fecha, `${campo}.fecha`),
    contexto: texto(bruto.contexto, `${campo}.contexto`),
    fragmento: texto(bruto.fragmento, `${campo}.fragmento`),
    estadoProvenance: unaDe(
      bruto.estadoProvenance,
      ["verificada", "pendiente_de_validacion"] as const,
      `${campo}.estadoProvenance`,
    ),
    localizador: textoOpcional(bruto.localizador, `${campo}.localizador`),
    nota: textoOpcional(bruto.nota, `${campo}.nota`),
  };
}

function opcion(valor: unknown, campo: string): OpcionReto {
  const bruto = objeto(valor, campo);
  return {
    id: texto(bruto.id, `${campo}.id`),
    etiqueta: texto(bruto.etiqueta, `${campo}.etiqueta`),
    detalle: textoOpcional(bruto.detalle, `${campo}.detalle`),
  };
}

function opcionRuta(valor: unknown, campo: string): OpcionRuta {
  const bruto = objeto(valor, campo);
  return {
    ...opcion(valor, campo),
    puntos: listaTextos(bruto.puntos, `${campo}.puntos`),
    manzanasTotales: numero(bruto.manzanasTotales, `${campo}.manzanasTotales`),
  };
}

function reto(valor: unknown, campo: string): Reto {
  const bruto = objeto(valor, campo);
  const comun = {
    id: texto(bruto.id, `${campo}.id`),
    titulo: texto(bruto.titulo, `${campo}.titulo`),
    instruccion: texto(bruto.instruccion, `${campo}.instruccion`),
    ayudasDisponibles: numero(bruto.ayudasDisponibles, `${campo}.ayudasDisponibles`),
  };
  const tipo = unaDe(bruto.tipo, ["fuentes", "ruta"] as const, `${campo}.tipo`);

  if (tipo === "fuentes") {
    return {
      ...comun,
      tipo,
      fuentes: lista(bruto.fuentes, `${campo}.fuentes`).map((f, i) => fuente(f, `${campo}.fuentes[${i}]`)),
      opciones: lista(bruto.opciones, `${campo}.opciones`).map((o, i) => opcion(o, `${campo}.opciones[${i}]`)),
      seleccionMultiple: booleano(bruto.seleccionMultiple, `${campo}.seleccionMultiple`),
    };
  }

  return {
    ...comun,
    tipo,
    zonaId: texto(bruto.zonaId, `${campo}.zonaId`),
    condicion: texto(bruto.condicion, `${campo}.condicion`),
    opciones: lista(bruto.opciones, `${campo}.opciones`).map((o, i) => opcionRuta(o, `${campo}.opciones[${i}]`)),
  };
}

function cierre(valor: unknown, campo: string): Cierre {
  const bruto = objeto(valor, campo);
  return {
    titulo: texto(bruto.titulo, `${campo}.titulo`),
    mensaje: texto(bruto.mensaje, `${campo}.mensaje`),
    notaRecompensa: texto(bruto.notaRecompensa, `${campo}.notaRecompensa`),
  };
}

function resumenMision(valor: unknown, campo: string): ResumenMision {
  const bruto = objeto(valor, campo);
  const grados = lista(bruto.gradosDisponibles, `${campo}.gradosDisponibles`).map((g, i) =>
    grado(g, `${campo}.gradosDisponibles[${i}]`),
  );
  return {
    id: texto(bruto.id, `${campo}.id`),
    titulo: texto(bruto.titulo, `${campo}.titulo`),
    premisa: texto(bruto.premisa, `${campo}.premisa`),
    gradosDisponibles: grados,
  };
}

export function leerManifiesto(valor: unknown): ManifiestoContenido {
  const bruto = objeto(valor, "manifiesto");
  return {
    contentVersion: texto(bruto.contentVersion, "manifiesto.contentVersion"),
    aviso: aviso(bruto.aviso, "manifiesto.aviso"),
    misiones: lista(bruto.misiones, "manifiesto.misiones").map((m, i) =>
      resumenMision(m, `manifiesto.misiones[${i}]`),
    ),
  };
}

export function leerMision(valor: unknown): Mision {
  const bruto = objeto(valor, "mision");
  const retos = lista(bruto.retos, "mision.retos").map((r, i) => reto(r, `mision.retos[${i}]`));
  if (retos.length === 0) throw new ErrorContenido("mision.retos");
  return {
    id: texto(bruto.id, "mision.id"),
    contentVersion: texto(bruto.contentVersion, "mision.contentVersion"),
    aviso: aviso(bruto.aviso, "mision.aviso"),
    titulo: texto(bruto.titulo, "mision.titulo"),
    premisa: texto(bruto.premisa, "mision.premisa"),
    grado: grado(bruto.grado, "mision.grado"),
    zona: zona(bruto.zona, "mision.zona"),
    personajes: lista(bruto.personajes, "mision.personajes").map((p, i) =>
      personaje(p, `mision.personajes[${i}]`),
    ),
    instrucciones: instrucciones(bruto.instrucciones, "mision.instrucciones"),
    retos,
    cierre: cierre(bruto.cierre, "mision.cierre"),
  };
}

export function leerVeredicto(valor: unknown): Veredicto {
  const bruto = objeto(valor, "veredicto");
  return {
    retoId: texto(bruto.retoId, "veredicto.retoId"),
    resultado: unaDe(
      bruto.resultado,
      ["con_evidencia", "evidencia_insuficiente", "incompleta"] as const,
      "veredicto.resultado",
    ),
    mensaje: texto(bruto.mensaje, "veredicto.mensaje"),
    criterio: texto(bruto.criterio, "veredicto.criterio"),
    puedeReintentar: booleano(bruto.puedeReintentar, "veredicto.puedeReintentar"),
    xpJuego: numeroOpcional(bruto.xpJuego, "veredicto.xpJuego"),
  };
}

export function leerAyuda(valor: unknown): Ayuda {
  const bruto = objeto(valor, "ayuda");
  return {
    retoId: texto(bruto.retoId, "ayuda.retoId"),
    tipo: unaDe(bruto.tipo, ["pista", "dialogo"] as const, "ayuda.tipo"),
    texto: texto(bruto.texto, "ayuda.texto"),
    origen: unaDe(bruto.origen, ["catalogo", "simulada", "gemini"] as const, "ayuda.origen"),
  };
}
