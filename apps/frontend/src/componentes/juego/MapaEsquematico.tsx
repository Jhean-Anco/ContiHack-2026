"use client";

import { useId } from "react";

import type { PuntoZona, Zona } from "@/servicios/contratos";

/**
 * Esquema de la zona.
 *
 * Los puntos son botones reales: el teclado funciona sin atajos propios y el
 * tamaño respeta el mínimo táctil. El dibujo es decorativo respecto al contenido —
 * toda la información que muestra está también en `ListaPuntos`, que es la
 * alternativa equivalente exigida por docs/04-ux-ui/hud.md.
 *
 * No es cartografía: las posiciones vienen del esquema del contenido y no
 * representan calles ni escalas reales.
 */
export function MapaEsquematico({
  zona,
  puntoActivoId,
  puntosResaltados = [],
  onSeleccionarPunto,
}: {
  zona: Zona;
  puntoActivoId: string | null;
  puntosResaltados?: string[];
  onSeleccionarPunto: (punto: PuntoZona) => void;
}) {
  const idEsquema = useId();
  const porId = new Map(zona.puntos.map((punto) => [punto.id, punto]));

  return (
    <figure className="m-0 space-y-3">
      <div
        className="relative w-full overflow-hidden rounded-md border-2 border-borde bg-superficie-alt"
        style={{ aspectRatio: "4 / 3" }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern id={`${idEsquema}-trama`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0H0v10" fill="none" stroke="var(--ch-borde)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#${idEsquema}-trama)`} />
          {zona.tramos.map((tramo) => {
            const desde = porId.get(tramo.desde);
            const hacia = porId.get(tramo.hacia);
            if (!desde || !hacia) return null;
            const enRuta =
              puntosResaltados.includes(tramo.desde) && puntosResaltados.includes(tramo.hacia);
            return (
              <line
                key={`${tramo.desde}-${tramo.hacia}`}
                x1={desde.x}
                y1={desde.y}
                x2={hacia.x}
                y2={hacia.y}
                stroke={enRuta ? "var(--ch-accion)" : "var(--ch-borde-fuerte)"}
                strokeWidth={enRuta ? 1.8 : 0.9}
                strokeDasharray={enRuta ? undefined : "3 2"}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {zona.puntos.map((punto) => {
          const activo = punto.id === puntoActivoId;
          const enRuta = puntosResaltados.includes(punto.id);
          return (
            <button
              key={punto.id}
              type="button"
              onClick={() => onSeleccionarPunto(punto)}
              aria-pressed={activo}
              className={[
                "absolute flex min-h-[2.75rem] min-w-[2.75rem] -translate-x-1/2 -translate-y-1/2",
                "items-center justify-center rounded-full border-2 px-3 text-xs font-bold",
                "transition-colors duration-150",
                activo
                  ? "border-tinta bg-accion text-accion-tinta"
                  : enRuta
                    ? "border-accion bg-accion-suave text-tinta"
                    : "border-borde-fuerte bg-superficie text-tinta hover:bg-superficie-alt",
              ].join(" ")}
              style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
            >
              <span aria-hidden="true">{punto.esAncla ? "★" : punto.manzanasDesdeAncla}</span>
              <span className="solo-lectores">
                {punto.nombre}. {punto.esAncla ? "Punto ancla." : `A ${punto.manzanasDesdeAncla} manzanas del ancla.`}{" "}
                {punto.descripcion}
              </span>
            </button>
          );
        })}
      </div>

      <figcaption className="text-sm text-tinta-suave">
        Esquema sin escala: la estrella marca el punto ancla y cada número indica las manzanas
        recorridas hasta ese punto. No es un mapa de calles reales.
      </figcaption>
    </figure>
  );
}

/** Alternativa textual al esquema, con la misma información y sin precisión motora. */
export function ListaPuntos({
  zona,
  puntoActivoId,
  onSeleccionarPunto,
}: {
  zona: Zona;
  puntoActivoId: string | null;
  onSeleccionarPunto: (punto: PuntoZona) => void;
}) {
  return (
    <ul className="space-y-2">
      {zona.puntos.map((punto) => {
        const activo = punto.id === puntoActivoId;
        return (
          <li key={punto.id}>
            <button
              type="button"
              onClick={() => onSeleccionarPunto(punto)}
              aria-pressed={activo}
              className={[
                "flex w-full min-h-[2.75rem] flex-col items-start gap-1 rounded-md border-2 p-3 text-left",
                activo ? "border-tinta bg-accion-suave" : "border-borde bg-superficie hover:bg-superficie-alt",
              ].join(" ")}
            >
              <span className="flex flex-wrap items-center gap-2 font-semibold text-tinta">
                {punto.nombre}
                <span className="text-xs font-medium text-tinta-suave">
                  {punto.esAncla ? "punto ancla" : `${punto.manzanasDesdeAncla} manzanas del ancla`}
                </span>
              </span>
              <span className="text-sm text-tinta-suave">{punto.descripcion}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
