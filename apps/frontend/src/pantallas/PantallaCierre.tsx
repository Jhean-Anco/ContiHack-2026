"use client";

import { Boton } from "@/componentes/base/Boton";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Etiqueta } from "@/componentes/base/Etiqueta";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import type { Cierre, Reto } from "@/servicios/contratos";

/**
 * Cierre de la misión.
 *
 * Resume lo que se recorrió sin asignar calificación, nivel ni porcentaje, y
 * explica que el XP es recompensa de juego.
 */
export function PantallaCierre({
  cierre,
  retos,
  xpJuego,
  onReiniciar,
}: {
  cierre: Cierre;
  retos: Reto[];
  xpJuego: number;
  onReiniciar: () => void;
}) {
  return (
    <Panel aria-labelledby="titulo-cierre" className="space-y-6">
      <TituloPanel id="titulo-cierre" sobretitulo="Fin de la sesión">
        {cierre.titulo}
      </TituloPanel>

      <p className="max-w-[68ch] text-lg text-tinta">{cierre.mensaje}</p>

      <section aria-labelledby="recorrido-hecho" className="space-y-3">
        <h3 id="recorrido-hecho" className="text-base font-bold text-tinta">
          Lo que recorriste
        </h3>
        <ul className="space-y-2">
          {retos.map((reto) => (
            <li
              key={reto.id}
              className="flex items-start gap-3 rounded-md border-2 border-borde bg-superficie-alt p-3"
            >
              <span aria-hidden="true" className="font-bold text-tinta-suave">
                •
              </span>
              <span className="text-tinta">
                <span className="font-semibold">{reto.titulo}: </span>
                {reto.instruccion}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-tinta-suave">
          Esta lista describe las etapas de la historia. No dice qué aprendiste ni cuánto: eso no lo
          mide este prototipo.
        </p>
      </section>

      {xpJuego > 0 ? (
        <p className="flex flex-wrap items-center gap-2 text-sm text-tinta">
          <Etiqueta tono="juego">{xpJuego} puntos de juego</Etiqueta>
          {cierre.notaRecompensa}
        </p>
      ) : (
        <p className="text-sm text-tinta-suave">{cierre.notaRecompensa}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" tamano="grande" onClick={onReiniciar}>
          Volver a empezar
        </Boton>
        <EnlaceBoton href="/" variante="sutil" tamano="grande">
          Salir al inicio
        </EnlaceBoton>
      </div>
    </Panel>
  );
}
