"use client";

/**
 * Une la máquina de navegación con el puerto de contenido.
 *
 * Aquí viven las peticiones, su cancelación y su traducción a eventos de interfaz.
 * Ninguna decisión pedagógica se toma en este archivo.
 */

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import { clienteContenido, ErrorServicio } from "@/servicios/clienteContenido";
import type { Grado } from "@/servicios/contratos";
import { ErrorContenido } from "@/servicios/validacion";
import {
  ayudasRestantes,
  esUltimoReto,
  estadoInicial,
  reducir,
  retoActual,
  type EventoFlujo,
  type Panel,
  type Paso,
} from "./maquinaUI";

function mensajeDeError(error: unknown, alternativa: string): string {
  if (error instanceof ErrorServicio) return error.message;
  if (error instanceof ErrorContenido) {
    return "El contenido recibido no se puede mostrar. Vuelve a intentarlo.";
  }
  return alternativa;
}

function fueCancelado(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export function useFlujoMision() {
  const [estado, despachar] = useReducer(reducir, estadoInicial);
  const peticionEnCurso = useRef<AbortController | null>(null);

  const enviar = useCallback((evento: EventoFlujo) => despachar(evento), []);

  useEffect(() => {
    return () => peticionEnCurso.current?.abort();
  }, []);

  // La misión no se codifica en la interfaz: se descubre en el manifiesto, que es
  // el endpoint previsto para eso. Así el id del catálogo puede cambiar sin tocar la UI.
  const cargarMision = useCallback(async (grado: Grado) => {
    peticionEnCurso.current?.abort();
    const control = new AbortController();
    peticionEnCurso.current = control;
    despachar({ tipo: "cargaIniciada" });
    try {
      const manifiesto = await clienteContenido.obtenerManifiesto(control.signal);
      const publicada =
        manifiesto.misiones.find((candidata) => candidata.gradosDisponibles.includes(grado)) ?? null;

      if (publicada === null) {
        despachar({
          tipo: "catalogoVacio",
          mensaje:
            manifiesto.misiones.length === 0
              ? "Todavía no hay ninguna misión publicada."
              : "No hay una misión publicada para el grado que elegiste.",
        });
        return;
      }

      const mision = await clienteContenido.obtenerMision(publicada.id, grado, control.signal);
      despachar({ tipo: "cargaLista", mision });
    } catch (error) {
      if (fueCancelado(error)) return;
      despachar({
        tipo: "cargaFallida",
        mensaje: mensajeDeError(error, "No se pudo cargar la misión."),
      });
    }
  }, []);

  // La misión se pide al confirmar el grado, no antes: la variante depende de él.
  const gradoConfirmado = estado.paso === "entrada" || estado.paso === "grado" ? null : estado.gradoMarcado;

  useEffect(() => {
    if (gradoConfirmado === null) return;
    if (estado.mision !== null || estado.carga !== "inactivo") return;
    void cargarMision(gradoConfirmado);
  }, [gradoConfirmado, estado.mision, estado.carga, cargarMision]);

  const responder = useCallback(async () => {
    const reto = retoActual(estado);
    if (!reto || estado.gradoMarcado === null || !estado.mision) return;
    if (estado.seleccion.length === 0) {
      despachar({ tipo: "intentoFallido", mensaje: "Marca una opción antes de responder." });
      return;
    }

    peticionEnCurso.current?.abort();
    const control = new AbortController();
    peticionEnCurso.current = control;
    despachar({ tipo: "intentoEnviado" });
    try {
      const veredicto = await clienteContenido.enviarIntento(
        {
          misionId: estado.mision.id,
          retoId: reto.id,
          grado: estado.gradoMarcado,
          opcionesSeleccionadas: estado.seleccion,
        },
        control.signal,
      );
      despachar({ tipo: "veredictoRecibido", veredicto });
    } catch (error) {
      if (fueCancelado(error)) return;
      despachar({
        tipo: "intentoFallido",
        mensaje: mensajeDeError(error, "No se pudo enviar tu respuesta."),
      });
    }
  }, [estado]);

  const pedirAyuda = useCallback(async () => {
    const reto = retoActual(estado);
    if (!reto || estado.gradoMarcado === null || !estado.mision) return;

    const control = new AbortController();
    despachar({ tipo: "ayudaSolicitada" });
    try {
      const ayuda = await clienteContenido.pedirAyuda(
        {
          misionId: estado.mision.id,
          retoId: reto.id,
          grado: estado.gradoMarcado,
          ayudasConsumidas: estado.ayudasConsumidas[reto.id] ?? 0,
          opcionesSeleccionadas: estado.seleccion,
        },
        control.signal,
      );
      despachar({ tipo: "ayudaRecibida", ayuda });
    } catch (error) {
      if (fueCancelado(error)) return;
      despachar({
        tipo: "ayudaFallida",
        mensaje: mensajeDeError(error, "No se pudo obtener una pista."),
      });
    }
  }, [estado]);

  const acciones = useMemo(
    () => ({
      comenzar: () => enviar({ tipo: "comenzar" }),
      marcarGrado: (grado: Grado) => enviar({ tipo: "marcarGrado", grado }),
      confirmarGrado: () => enviar({ tipo: "confirmarGrado" }),
      volverAGrado: () => enviar({ tipo: "volverAGrado" }),
      irA: (paso: Extract<Paso, "instrucciones" | "mapa" | "contexto" | "reto">) =>
        enviar({ tipo: "irA", paso }),
      marcarOpcion: (id: string, multiple: boolean) => enviar({ tipo: "marcarOpcion", id, multiple }),
      reintentar: () => enviar({ tipo: "reintentar" }),
      continuar: () => enviar({ tipo: "continuar" }),
      abrirPanel: (panel: Exclude<Panel, "ninguno">) => enviar({ tipo: "abrirPanel", panel }),
      cerrarPanel: () => enviar({ tipo: "cerrarPanel" }),
      descartarError: () => enviar({ tipo: "descartarError" }),
      reiniciar: () => enviar({ tipo: "reiniciar" }),
      responder,
      pedirAyuda,
      reintentarCarga: () => {
        if (estado.gradoMarcado !== null) void cargarMision(estado.gradoMarcado);
      },
    }),
    [enviar, responder, pedirAyuda, cargarMision, estado.gradoMarcado],
  );

  return {
    estado,
    acciones,
    reto: retoActual(estado),
    esUltimoReto: esUltimoReto(estado),
    ayudasRestantes: ayudasRestantes(estado),
  };
}

export type FlujoMision = ReturnType<typeof useFlujoMision>;
