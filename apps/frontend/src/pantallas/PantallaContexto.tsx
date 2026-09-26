"use client";

import { Boton } from "@/componentes/base/Boton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import { DialogoPersonaje } from "@/componentes/juego/DialogoPersonaje";
import { TarjetaFuente } from "@/componentes/juego/TarjetaFuente";
import type { Mision } from "@/servicios/contratos";

/**
 * Contexto de la misión: qué dicen las guías y qué fichas hay disponibles.
 *
 * Las fichas se muestran completas aquí y siguen consultables desde el reto, para
 * que nadie dependa de recordar una pantalla anterior.
 */
export function PantallaContexto({
  mision,
  onContinuar,
  onVolverAlMapa,
}: {
  mision: Mision;
  onContinuar: () => void;
  onVolverAlMapa: () => void;
}) {
  const retoDeFuentes = mision.retos.find((reto) => reto.tipo === "fuentes");

  return (
    <Panel aria-labelledby="titulo-contexto" className="space-y-6">
      <TituloPanel id="titulo-contexto" sobretitulo="Contexto">
        Antes del primer reto
      </TituloPanel>

      <div className="space-y-4">
        {mision.personajes.map((personaje) => (
          <DialogoPersonaje key={personaje.id} personaje={personaje} />
        ))}
      </div>

      {retoDeFuentes?.tipo === "fuentes" ? (
        <section aria-labelledby="fichas-disponibles" className="space-y-4">
          <div className="space-y-1">
            <h3 id="fichas-disponibles" className="text-lg font-bold text-tinta">
              Fichas disponibles
            </h3>
            <p className="text-sm text-tinta-suave">
              Cada ficha declara de dónde viene. Podrás volver a leerlas durante el reto.
            </p>
          </div>
          <div className="space-y-4">
            {retoDeFuentes.fuentes.map((fuente) => (
              <TarjetaFuente key={fuente.id} fuente={fuente} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" tamano="grande" onClick={onContinuar}>
          Empezar el primer reto
        </Boton>
        <Boton variante="sutil" tamano="grande" onClick={onVolverAlMapa}>
          Volver al esquema
        </Boton>
      </div>
    </Panel>
  );
}
