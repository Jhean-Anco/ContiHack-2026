"use client";

import { GRADOS, type Grado } from "@/servicios/contratos";

const NOMBRES: Record<Grado, string> = {
  1: "Primero",
  2: "Segundo",
  3: "Tercero",
  4: "Cuarto",
  5: "Quinto",
};

/**
 * Selección temporal del grado.
 *
 * Son radios nativos dentro de un `fieldset`: las flechas y el grupo accesible
 * funcionan sin atajos propios. No pide identidad, no verifica nada y el valor se
 * queda en memoria de la sesión.
 */
export function SelectorGrado({
  gradoMarcado,
  gradosDisponibles = GRADOS,
  onMarcar,
}: {
  gradoMarcado: Grado | null;
  gradosDisponibles?: readonly Grado[];
  onMarcar: (grado: Grado) => void;
}) {
  return (
    <fieldset className="space-y-3 border-0 p-0">
      <legend className="text-lg font-semibold text-tinta">¿En qué grado estás?</legend>
      <p className="text-sm text-tinta-suave">
        Sirve para mostrarte una variante de la misión durante esta sesión. No se guarda y puedes
        cambiarla antes de empezar.
      </p>
      <div className="grid gap-3 sm:grid-cols-5">
        {gradosDisponibles.map((grado) => {
          const marcado = gradoMarcado === grado;
          return (
            <label
              key={grado}
              className={[
                "flex min-h-[2.75rem] cursor-pointer items-center gap-3 rounded-md border-2 p-3",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px]",
                "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foco",
                marcado ? "border-tinta bg-accion-suave" : "border-borde bg-superficie hover:bg-superficie-alt",
              ].join(" ")}
            >
              <input
                type="radio"
                name="grado"
                value={grado}
                checked={marcado}
                onChange={() => onMarcar(grado)}
                className="h-5 w-5 accent-[var(--ch-accion)]"
              />
              <span className="font-semibold text-tinta">
                {NOMBRES[grado]}
                <span className="block text-xs font-medium text-tinta-suave">de Secundaria</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
