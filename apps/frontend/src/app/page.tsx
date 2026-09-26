import { Aviso } from "@/componentes/base/Aviso";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Panel } from "@/componentes/base/Panel";

/**
 * Portada.
 *
 * Presenta el proyecto y da entrada a la misión. Describe el estado real —un
 * prototipo en construcción con contenido sin validar— y no promete alineación
 * curricular ni fidelidad histórica.
 */
export default function Portada() {
  return (
    <main id="contenido" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tinta-suave">
            ContiHack 2026
          </p>
          <h1 className="max-w-[24ch] text-3xl font-bold tracking-tight text-tinta sm:text-4xl">
            Un juego web para recorrer fuentes y recorridos de una zona
          </h1>
          <p className="max-w-[68ch] text-lg text-tinta">
            Prototipo de videojuego educativo para estudiantes de 1.º a 5.º de Educación Secundaria,
            con dos retos conectados: revisar fichas con su procedencia y elegir un recorrido en un
            esquema de la zona.
          </p>
        </header>

        <Aviso tono="aviso" titulo="Prototipo en construcción">
          El contenido histórico, los objetivos curriculares y el mapa son material de ejemplo sin
          validación curricular, histórica ni local. La sesión no pide datos personales y no guarda
          progreso: al salir o recargar, la misión se reinicia.
        </Aviso>

        <div className="flex flex-wrap gap-3">
          <EnlaceBoton href="/jugar" variante="primaria" tamano="grande">
            Entrar a la misión
          </EnlaceBoton>
          <EnlaceBoton href="/salud" variante="sutil" tamano="grande">
            Ver salud de los servicios
          </EnlaceBoton>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Panel como="article" fondo="tenue" className="space-y-2">
            <h2 className="text-base font-bold text-tinta">Sin cuenta</h2>
            <p className="text-sm text-tinta-suave">
              No pide nombre, correo, escuela, ubicación, foto ni voz para jugar.
            </p>
          </Panel>
          <Panel como="article" fondo="tenue" className="space-y-2">
            <h2 className="text-base font-bold text-tinta">Teclado y táctil</h2>
            <p className="text-sm text-tinta-suave">
              El esquema tiene una lista equivalente y nada depende de precisión fina ni de tiempo.
            </p>
          </Panel>
          <Panel como="article" fondo="tenue" className="space-y-2">
            <h2 className="text-base font-bold text-tinta">Sin notas</h2>
            <p className="text-sm text-tinta-suave">
              Los puntos de juego son una recompensa de la partida, no una calificación.
            </p>
          </Panel>
        </div>
      </div>
    </main>
  );
}
