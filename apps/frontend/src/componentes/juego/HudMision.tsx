"use client";

import { Boton } from "@/componentes/base/Boton";
import { Etiqueta } from "@/componentes/base/Etiqueta";

/**
 * HUD de la misión.
 *
 * Muestra la tarea que se puede resolver ahora y deja siempre a la vista ayuda,
 * pausa y el regreso a las instrucciones o al esquema. La etapa describe el avance
 * de la historia, no avance curricular, y el XP va rotulado como recompensa.
 */
export function HudMision({
  objetivo,
  etapa,
  totalEtapas,
  nombreZona,
  xpJuego,
  ayudasRestantes,
  pidiendoAyuda,
  ayudaDisponible,
  onPedirAyuda,
  onPausa,
  onControles,
  onMapa,
}: {
  objetivo: string;
  etapa: number;
  totalEtapas: number;
  nombreZona: string;
  xpJuego: number;
  ayudasRestantes: number;
  pidiendoAyuda: boolean;
  ayudaDisponible: boolean;
  onPedirAyuda: () => void;
  onPausa: () => void;
  onControles: () => void;
  onMapa: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-borde bg-superficie/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tinta-suave">
            Etapa {etapa} de {totalEtapas} de la historia
          </p>
          <p className="text-xs text-tinta-suave">Estás en: {nombreZona}</p>
          {xpJuego > 0 ? (
            <Etiqueta tono="juego" className="ml-auto">
              {xpJuego} puntos de juego (no es una nota)
            </Etiqueta>
          ) : null}
        </div>

        <p className="text-base font-semibold text-tinta sm:text-lg">
          <span className="text-tinta-suave">Ahora: </span>
          {objetivo}
        </p>

        <nav aria-label="Controles de la misión" className="flex flex-wrap gap-2">
          <Boton
            variante="secundaria"
            onClick={onPedirAyuda}
            ocupado={pidiendoAyuda}
            disabled={!ayudaDisponible}
          >
            {pidiendoAyuda ? "Buscando pista…" : "Pedir una pista"}
            <span className="solo-lectores">
              {ayudaDisponible ? `, quedan ${ayudasRestantes}` : ", no quedan pistas en este reto"}
            </span>
            {ayudaDisponible ? (
              <span aria-hidden="true" className="text-sm font-medium text-tinta-suave">
                ({ayudasRestantes})
              </span>
            ) : null}
          </Boton>
          <Boton variante="secundaria" onClick={onMapa}>
            Ver el esquema
          </Boton>
          <Boton variante="secundaria" onClick={onControles}>
            Instrucciones y controles
          </Boton>
          <Boton variante="secundaria" onClick={onPausa}>
            Pausar o salir
          </Boton>
        </nav>
      </div>
    </header>
  );
}
