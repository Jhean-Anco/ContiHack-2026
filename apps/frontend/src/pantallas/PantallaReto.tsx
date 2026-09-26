"use client";

import { useState } from "react";

import { Aviso } from "@/componentes/base/Aviso";
import { Boton } from "@/componentes/base/Boton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import { ListaPuntos, MapaEsquematico } from "@/componentes/juego/MapaEsquematico";
import { OpcionesReto } from "@/componentes/juego/OpcionesReto";
import { TarjetaFuente } from "@/componentes/juego/TarjetaFuente";
import type { PuntoZona, Reto, Zona } from "@/servicios/contratos";

/**
 * Pantalla de un reto. Presenta una tarea a la vez.
 *
 * No calcula nada: recoge la selección y la entrega al orquestador, que pregunta al
 * servidor. La fuente y el esquema quedan visibles mientras se responde.
 */
export function PantallaReto({
  reto,
  zona,
  numero,
  total,
  seleccion,
  enviando,
  mensajeError,
  onMarcar,
  onResponder,
  onVolverAlContexto,
}: {
  reto: Reto;
  zona: Zona;
  numero: number;
  total: number;
  seleccion: string[];
  enviando: boolean;
  mensajeError: string | null;
  onMarcar: (id: string) => void;
  onResponder: () => void;
  onVolverAlContexto: () => void;
}) {
  const [puntoActivo, setPuntoActivo] = useState<PuntoZona | null>(null);

  const puntosDeRutaMarcada =
    reto.tipo === "ruta"
      ? (reto.opciones.find((opcion) => seleccion.includes(opcion.id))?.puntos ?? [])
      : [];

  const seleccionarPunto = (punto: PuntoZona) =>
    setPuntoActivo((actual) => (actual?.id === punto.id ? null : punto));

  return (
    <Panel aria-labelledby="titulo-reto" className="space-y-6">
      <TituloPanel id="titulo-reto" sobretitulo={`Reto ${numero} de ${total}`}>
        {reto.titulo}
      </TituloPanel>

      <p className="max-w-[68ch] text-lg text-tinta">{reto.instruccion}</p>

      {reto.tipo === "fuentes" ? (
        <section aria-labelledby="fuentes-del-reto" className="space-y-4">
          <h3 id="fuentes-del-reto" className="text-base font-bold text-tinta">
            Fichas para revisar
          </h3>
          <div className="space-y-4">
            {reto.fuentes.map((fuente) => (
              <TarjetaFuente key={fuente.id} fuente={fuente} />
            ))}
          </div>
        </section>
      ) : (
        <section aria-labelledby="esquema-del-reto" className="space-y-4">
          <h3 id="esquema-del-reto" className="text-base font-bold text-tinta">
            Esquema y condición
          </h3>
          <Aviso tono="info" titulo="Condición del recorrido">
            {reto.condicion}
          </Aviso>
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <MapaEsquematico
              zona={zona}
              puntoActivoId={puntoActivo?.id ?? null}
              puntosResaltados={puntosDeRutaMarcada}
              onSeleccionarPunto={seleccionarPunto}
            />
            <div className="space-y-3">
              <h4 className="text-base font-bold text-tinta">Puntos de la zona</h4>
              <ListaPuntos
                zona={zona}
                puntoActivoId={puntoActivo?.id ?? null}
                onSeleccionarPunto={seleccionarPunto}
              />
            </div>
          </div>
          <div role="status" className="rounded-md border-2 border-borde bg-superficie-alt p-4">
            {puntoActivo ? (
              <p className="text-tinta">
                <span className="font-semibold">{puntoActivo.nombre}: </span>
                {puntoActivo.descripcion}
              </p>
            ) : (
              <p className="text-tinta-suave">
                Elige un punto del esquema o de la lista para leer su descripción.
              </p>
            )}
          </div>
        </section>
      )}

      <OpcionesReto
        opciones={reto.opciones}
        seleccion={seleccion}
        multiple={reto.tipo === "fuentes" ? reto.seleccionMultiple : false}
        etiquetaGrupo={reto.tipo === "fuentes" ? "Tu respuesta" : "Recorrido que eliges"}
        deshabilitado={enviando}
        onMarcar={onMarcar}
      />

      {mensajeError ? (
        <Aviso tono="error" urgente>
          {mensajeError}
        </Aviso>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Boton
          variante="primaria"
          tamano="grande"
          onClick={onResponder}
          ocupado={enviando}
          disabled={seleccion.length === 0}
        >
          {enviando ? "Enviando…" : "Responder"}
        </Boton>
        <Boton variante="sutil" tamano="grande" onClick={onVolverAlContexto}>
          Volver al contexto
        </Boton>
      </div>
    </Panel>
  );
}
