"use client";

import { useEffect, useRef } from "react";

import { Boton } from "@/componentes/base/Boton";
import { Etiqueta } from "@/componentes/base/Etiqueta";
import type { ResultadoIntento, Veredicto } from "@/servicios/contratos";

const PRESENTACION: Record<ResultadoIntento, { palabra: string; simbolo: string; marco: string }> = {
  con_evidencia: {
    palabra: "Tu elección queda respaldada",
    simbolo: "✓",
    marco: "border-exito bg-exito-fondo",
  },
  evidencia_insuficiente: {
    palabra: "Falta evidencia para sostenerlo",
    simbolo: "!",
    marco: "border-aviso bg-aviso-fondo",
  },
  incompleta: {
    palabra: "La respuesta está incompleta",
    simbolo: "?",
    marco: "border-info bg-info-fondo",
  },
};

/**
 * Feedback de un intento.
 *
 * El texto, el criterio y si se puede reintentar los decide el servidor; este
 * componente solo los presenta. No muestra puntaje, porcentaje ni nota, y el XP
 * aparece rotulado como recompensa de juego.
 *
 * Al aparecer toma el foco para que el resultado no pase desapercibido y para que
 * los controles de reintento queden a un paso.
 */
export function PanelFeedback({
  veredicto,
  esUltimoReto,
  onReintentar,
  onContinuar,
  onVolverAFuente,
}: {
  veredicto: Veredicto;
  esUltimoReto: boolean;
  onReintentar: () => void;
  onContinuar: () => void;
  onVolverAFuente: () => void;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const presentacion = PRESENTACION[veredicto.resultado];

  useEffect(() => {
    contenedor.current?.focus();
  }, [veredicto]);

  return (
    <div
      ref={contenedor}
      tabIndex={-1}
      className={["space-y-5 rounded-lg border-2 border-l-8 p-5 sm:p-7", presentacion.marco].join(" ")}
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-current text-lg font-bold"
        >
          {presentacion.simbolo}
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-tinta">{presentacion.palabra}</h2>
          <p className="text-lg text-tinta">{veredicto.mensaje}</p>
        </div>
      </header>

      <div className="space-y-2 rounded-md border-2 border-borde bg-superficie p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-tinta-suave">
          En qué se apoya esta respuesta
        </h3>
        <p className="text-tinta">{veredicto.criterio}</p>
      </div>

      {veredicto.xpJuego !== undefined && veredicto.xpJuego > 0 ? (
        <p className="flex flex-wrap items-center gap-2 text-sm text-tinta-suave">
          <Etiqueta tono="juego">+{veredicto.xpJuego} puntos de juego</Etiqueta>
          Son una recompensa de la partida, no una nota ni una medida de lo que aprendiste.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {veredicto.puedeReintentar ? (
          <Boton variante="secundaria" onClick={onReintentar}>
            Cambiar mi respuesta
          </Boton>
        ) : null}
        <Boton variante="sutil" onClick={onVolverAFuente}>
          Volver a las fichas
        </Boton>
        <Boton variante="primaria" onClick={onContinuar}>
          {esUltimoReto ? "Ir al cierre" : "Continuar"}
        </Boton>
      </div>
    </div>
  );
}
