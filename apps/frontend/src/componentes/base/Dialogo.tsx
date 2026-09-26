"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";

import { Boton } from "./Boton";

const SELECTOR_ENFOCABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Diálogo modal con foco predecible: al abrir toma el foco, lo mantiene dentro
 * mientras está abierto, cierra con Escape y lo devuelve al control que lo abrió.
 */
export function Dialogo({
  titulo,
  descripcion,
  onCerrar,
  children,
  acciones,
  cerrarAlTocarFondo = false,
}: {
  titulo: string;
  descripcion?: string;
  onCerrar: () => void;
  children: ReactNode;
  acciones?: ReactNode;
  cerrarAlTocarFondo?: boolean;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);
  const idTitulo = useId();
  const idDescripcion = useId();

  const enfocables = useCallback((): HTMLElement[] => {
    if (!contenedor.current) return [];
    return Array.from(contenedor.current.querySelectorAll<HTMLElement>(SELECTOR_ENFOCABLE)).filter(
      (elemento) => elemento.offsetParent !== null || elemento === document.activeElement,
    );
  }, []);

  useEffect(() => {
    focoAnterior.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const primero = enfocables()[0];
    (primero ?? contenedor.current)?.focus();

    const desbordeAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = desbordeAnterior;
      focoAnterior.current?.focus();
    };
  }, [enfocables]);

  const alPresionarTecla = (evento: React.KeyboardEvent<HTMLDivElement>) => {
    if (evento.key === "Escape") {
      evento.stopPropagation();
      onCerrar();
      return;
    }
    if (evento.key !== "Tab") return;

    const lista = enfocables();
    if (lista.length === 0) {
      evento.preventDefault();
      return;
    }
    const primero = lista[0];
    const ultimo = lista[lista.length - 1];
    const activo = document.activeElement;

    if (evento.shiftKey && (activo === primero || activo === contenedor.current)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && activo === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-tinta/45 p-4 sm:items-center"
      onMouseDown={(evento) => {
        if (cerrarAlTocarFondo && evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <div
        ref={contenedor}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        aria-describedby={descripcion ? idDescripcion : undefined}
        tabIndex={-1}
        onKeyDown={alPresionarTecla}
        className="w-full max-w-xl rounded-lg border-2 border-borde-fuerte bg-superficie p-5 shadow-panel sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id={idTitulo} className="text-xl font-bold text-tinta">
              {titulo}
            </h2>
            {descripcion ? (
              <p id={idDescripcion} className="text-sm text-tinta-suave">
                {descripcion}
              </p>
            ) : null}
          </div>
          <Boton variante="secundaria" onClick={onCerrar} aria-label={`Cerrar ${titulo}`}>
            <span aria-hidden="true">×</span>
            <span className="hidden sm:inline">Cerrar</span>
          </Boton>
        </div>

        <div className="mt-5 space-y-4 text-tinta">{children}</div>

        {acciones ? <div className="mt-6 flex flex-wrap gap-3">{acciones}</div> : null}
      </div>
    </div>
  );
}
