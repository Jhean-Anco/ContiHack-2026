"use client";

import { useState } from "react";

import { Boton } from "@/componentes/base/Boton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import { ListaPuntos, MapaEsquematico } from "@/componentes/juego/MapaEsquematico";
import type { PuntoZona, Zona } from "@/servicios/contratos";

/**
 * Pantalla del esquema.
 *
 * El esquema y la lista de puntos se muestran juntos, no como alternativas
 * escondidas: la lista no es una versión degradada sino la misma información.
 */
export function PantallaMapa({
  zona,
  onContinuar,
}: {
  zona: Zona;
  onContinuar: () => void;
}) {
  const [puntoActivo, setPuntoActivo] = useState<PuntoZona | null>(null);

  const seleccionar = (punto: PuntoZona) =>
    setPuntoActivo((actual) => (actual?.id === punto.id ? null : punto));

  return (
    <Panel aria-labelledby="titulo-mapa" className="space-y-6">
      <TituloPanel id="titulo-mapa" sobretitulo="Zona de la misión">
        {zona.nombre}
      </TituloPanel>

      <p className="max-w-[68ch] text-tinta">{zona.descripcionAlternativa}</p>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <MapaEsquematico
          zona={zona}
          puntoActivoId={puntoActivo?.id ?? null}
          onSeleccionarPunto={seleccionar}
        />

        <section aria-labelledby="lista-puntos" className="space-y-3">
          <h3 id="lista-puntos" className="text-base font-bold text-tinta">
            Puntos de la zona
          </h3>
          <p className="text-sm text-tinta-suave">
            Esta lista hace lo mismo que el esquema. Elige un punto para leer su descripción.
          </p>
          <ListaPuntos
            zona={zona}
            puntoActivoId={puntoActivo?.id ?? null}
            onSeleccionarPunto={seleccionar}
          />
        </section>
      </div>

      <div
        role="status"
        className="min-h-[5rem] rounded-md border-2 border-borde bg-superficie-alt p-4"
      >
        {puntoActivo ? (
          <div className="space-y-1">
            <h3 className="font-bold text-tinta">{puntoActivo.nombre}</h3>
            <p className="text-sm text-tinta-suave">
              {puntoActivo.esAncla
                ? "Es el punto ancla del esquema."
                : `A ${puntoActivo.manzanasDesdeAncla} manzanas recorridas del ancla.`}
            </p>
            <p className="text-tinta">{puntoActivo.descripcion}</p>
          </div>
        ) : (
          <p className="text-tinta-suave">
            Ningún punto elegido todavía. Elige uno en el esquema o en la lista para ver su
            descripción aquí.
          </p>
        )}
      </div>

      <Boton variante="primaria" tamano="grande" onClick={onContinuar}>
        Hablar con las guías
      </Boton>
    </Panel>
  );
}
