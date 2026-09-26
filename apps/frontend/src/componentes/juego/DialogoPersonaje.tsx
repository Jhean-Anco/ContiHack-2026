"use client";

import { useState } from "react";

import { Boton } from "@/componentes/base/Boton";
import type { Personaje } from "@/servicios/contratos";

const FUNCION: Record<Personaje["funcion"], string> = {
  orientacion: "Te explica la misión",
  contexto: "Te explica las fichas",
  cierre: "Te acompaña al cerrar",
};

/**
 * Diálogo de un personaje guía, avanzado paso a paso.
 *
 * El texto completo siempre se puede desplegar: nadie necesita recordar una línea
 * anterior para entender la tarea. No hay chat abierto ni entrada de texto.
 */
export function DialogoPersonaje({ personaje }: { personaje: Personaje }) {
  const [indice, setIndice] = useState(0);
  const [verTodo, setVerTodo] = useState(false);
  const esUltima = indice >= personaje.lineas.length - 1;

  return (
    <div className="space-y-4 rounded-md border-2 border-borde bg-superficie-alt p-4">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-base font-bold text-tinta">{personaje.nombre}</h3>
        <p className="text-xs font-semibold uppercase tracking-wide text-tinta-suave">
          {FUNCION[personaje.funcion]}
        </p>
      </header>

      {verTodo ? (
        <ol className="space-y-2">
          {personaje.lineas.map((linea, i) => (
            <li key={linea} className="flex gap-3 text-tinta">
              <span aria-hidden="true" className="font-semibold text-tinta-suave">
                {i + 1}.
              </span>
              <span>{linea}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-lg leading-relaxed text-tinta">{personaje.lineas[indice]}</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {!verTodo ? (
          <>
            <Boton
              variante="secundaria"
              onClick={() => setIndice((actual) => Math.max(0, actual - 1))}
              disabled={indice === 0}
            >
              Línea anterior
            </Boton>
            <Boton
              variante="primaria"
              onClick={() => setIndice((actual) => Math.min(personaje.lineas.length - 1, actual + 1))}
              disabled={esUltima}
            >
              Siguiente línea
            </Boton>
            <p className="text-sm text-tinta-suave">
              Línea {indice + 1} de {personaje.lineas.length}
            </p>
          </>
        ) : null}
        <Boton variante="sutil" onClick={() => setVerTodo((actual) => !actual)}>
          {verTodo ? "Ver una línea a la vez" : "Ver todo el diálogo"}
        </Boton>
      </div>
    </div>
  );
}
