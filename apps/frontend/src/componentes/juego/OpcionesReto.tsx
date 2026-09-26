"use client";

import { useId } from "react";

import type { OpcionReto } from "@/servicios/contratos";

/**
 * Opciones cerradas de un reto. No hay campo de texto libre: el estudiante elige
 * entre opciones del catálogo (docs/02-game-design/concepto-pmv.md).
 *
 * Con selección única usa radios y con selección múltiple casillas, de modo que el
 * grupo, su nombre accesible y el teclado sean los nativos.
 */
export function OpcionesReto({
  opciones,
  seleccion,
  multiple,
  etiquetaGrupo,
  deshabilitado = false,
  onMarcar,
}: {
  opciones: OpcionReto[];
  seleccion: string[];
  multiple: boolean;
  etiquetaGrupo: string;
  deshabilitado?: boolean;
  onMarcar: (id: string) => void;
}) {
  const nombre = useId();

  return (
    <fieldset className="space-y-3 border-0 p-0" disabled={deshabilitado}>
      <legend className="text-base font-semibold text-tinta">{etiquetaGrupo}</legend>
      <p className="text-sm text-tinta-suave">
        {multiple ? "Puedes marcar más de una opción." : "Marca una opción."} Puedes cambiarla antes de
        responder.
      </p>
      <ul className="space-y-3">
        {opciones.map((opcion) => {
          const marcada = seleccion.includes(opcion.id);
          return (
            <li key={opcion.id}>
              <label
                className={[
                  "flex min-h-[2.75rem] cursor-pointer items-start gap-3 rounded-md border-2 p-4",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px]",
                  "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foco",
                  "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70",
                  marcada
                    ? "border-tinta bg-accion-suave"
                    : "border-borde bg-superficie hover:bg-superficie-alt",
                ].join(" ")}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={multiple ? `${nombre}-${opcion.id}` : nombre}
                  value={opcion.id}
                  checked={marcada}
                  onChange={() => onMarcar(opcion.id)}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--ch-accion)]"
                />
                <span className="space-y-1">
                  <span className="block font-semibold text-tinta">{opcion.etiqueta}</span>
                  {opcion.detalle ? (
                    <span className="block text-sm text-tinta-suave">{opcion.detalle}</span>
                  ) : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
