import { Boton } from "@/componentes/base/Boton";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";

/**
 * Entrada y privacidad.
 *
 * Explica antes de empezar qué hace la sesión y qué no guarda. No pide nombre,
 * correo, escuela, ubicación, imagen ni voz, y lo dice de forma explícita.
 */
export function PantallaEntrada({ onComenzar }: { onComenzar: () => void }) {
  return (
    <Panel aria-labelledby="titulo-entrada" className="space-y-6">
      <TituloPanel id="titulo-entrada" sobretitulo="Antes de empezar">
        Una misión corta, sin cuenta y sin datos tuyos
      </TituloPanel>

      <div className="max-w-[68ch] space-y-4 text-tinta">
        <p>
          Vas a recorrer una misión de prueba: primero revisas fichas con su procedencia y después
          eliges un recorrido en un esquema. Puedes pedir pistas, pausar o salir cuando quieras, sin
          penalización.
        </p>
        <ul className="space-y-2">
          {[
            "No pedimos tu nombre, correo, escuela, ubicación, foto ni voz.",
            "El grado que elijas se usa solo durante esta sesión y no se guarda.",
            "Si recargas o sales, la misión vuelve a empezar desde el inicio.",
            "Funciona con teclado y con pantalla táctil; el esquema tiene una lista equivalente.",
          ].map((linea) => (
            <li key={linea} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-tinta-suave">
                •
              </span>
              <span>{linea}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-tinta-suave">
          Esta es una versión en construcción: el contenido histórico y el mapa son material de
          ejemplo, todavía sin validación curricular, histórica ni local.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" tamano="grande" onClick={onComenzar}>
          Empezar la misión
        </Boton>
        <EnlaceBoton href="/" variante="sutil" tamano="grande">
          Salir al inicio
        </EnlaceBoton>
      </div>
    </Panel>
  );
}
