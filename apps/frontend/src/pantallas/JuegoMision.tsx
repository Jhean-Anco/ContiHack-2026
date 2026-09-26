"use client";

import { useEffect, useRef } from "react";

import { Aviso } from "@/componentes/base/Aviso";
import { Boton } from "@/componentes/base/Boton";
import { Cargando } from "@/componentes/base/Cargando";
import { Dialogo } from "@/componentes/base/Dialogo";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import { RegionAnuncios } from "@/componentes/base/RegionAnuncios";
import { AvisoEjemplo } from "@/componentes/juego/AvisoEjemplo";
import { HudMision } from "@/componentes/juego/HudMision";
import { MenuPausa } from "@/componentes/juego/MenuPausa";
import { PanelAyuda } from "@/componentes/juego/PanelAyuda";
import { PanelFeedback } from "@/componentes/juego/PanelFeedback";
import { useFlujoMision } from "@/flujo/useFlujoMision";
import type { Paso } from "@/flujo/maquinaUI";
import { PantallaCierre } from "./PantallaCierre";
import { PantallaContexto } from "./PantallaContexto";
import { PantallaEntrada } from "./PantallaEntrada";
import { PantallaGrado } from "./PantallaGrado";
import { PantallaInstrucciones } from "./PantallaInstrucciones";
import { PantallaMapa } from "./PantallaMapa";
import { PantallaReto } from "./PantallaReto";

/**
 * Orquestador del flujo de misión.
 *
 * Decide qué pantalla se ve según la máquina de navegación, mantiene el HUD y los
 * paneles, y mueve el foco al cambiar de pantalla para que el teclado no se quede
 * atrás. No evalúa respuestas ni calcula recompensas.
 *
 * La misión se descubre en el manifiesto dentro de `useFlujoMision`; esta pantalla no
 * conoce ningún id de catálogo.
 */

const OBJETIVO_POR_PASO: Partial<Record<Paso, string>> = {
  instrucciones: "Lee de qué trata la misión y cómo se controla.",
  mapa: "Conoce la zona y sus puntos antes del primer reto.",
  contexto: "Escucha a las guías y revisa las fichas disponibles.",
  feedback: "Revisa la explicación de tu respuesta.",
  cierre: "Cierra la sesión o vuelve a empezar.",
};

export function JuegoMision() {
  const flujo = useFlujoMision();
  const { estado, acciones, reto, ayudasRestantes } = flujo;
  const contenido = useRef<HTMLDivElement>(null);

  // El feedback se enfoca a sí mismo; el resto de pantallas reciben el foco aquí.
  useEffect(() => {
    if (estado.paso === "feedback") return;
    contenido.current?.focus();
  }, [estado.paso, estado.indiceReto]);

  const mision = estado.mision;
  const hudVisible = mision !== null && estado.paso !== "entrada" && estado.paso !== "grado";
  const objetivo =
    estado.paso === "reto" && reto ? reto.instruccion : (OBJETIVO_POR_PASO[estado.paso] ?? "");

  return (
    <div className="min-h-dvh bg-lienzo">
      <RegionAnuncios mensaje={estado.anuncio} />

      {hudVisible && mision ? (
        <HudMision
          objetivo={objetivo}
          etapa={estado.indiceReto + 1}
          totalEtapas={mision.retos.length}
          nombreZona={mision.zona.nombre}
          xpJuego={estado.xpJuego}
          ayudasRestantes={ayudasRestantes}
          pidiendoAyuda={estado.pidiendoAyuda}
          ayudaDisponible={estado.paso === "reto" && ayudasRestantes > 0 && !estado.enviando}
          onPedirAyuda={() => void acciones.pedirAyuda()}
          onMapa={() => acciones.irA("mapa")}
          onControles={() => acciones.abrirPanel("controles")}
          onPausa={() => acciones.abrirPanel("pausa")}
        />
      ) : null}

      <main id="contenido" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div ref={contenido} tabIndex={-1} className="space-y-6 outline-none">
          {mision ? <AvisoEjemplo aviso={mision.aviso} version={mision.contentVersion} /> : null}

          {estado.carga === "cargando" ? (
            <Panel className="space-y-4">
              <Cargando texto="Cargando la misión…" />
              <p className="text-sm text-tinta-suave">
                Si tarda demasiado, puedes reintentar o salir; no se perderá nada.
              </p>
            </Panel>
          ) : null}

          {estado.carga === "vacio" ? (
            <Panel className="space-y-5">
              <TituloPanel sobretitulo="Sin contenido disponible">
                Todavía no hay una misión que jugar
              </TituloPanel>
              <Aviso tono="info">
                {estado.mensajeError ?? "Todavía no hay ninguna misión publicada."}
              </Aviso>
              <div className="flex flex-wrap gap-3">
                <Boton variante="secundaria" onClick={acciones.volverAGrado}>
                  Elegir otro grado
                </Boton>
                <EnlaceBoton href="/" variante="sutil">
                  Salir al inicio
                </EnlaceBoton>
              </div>
            </Panel>
          ) : null}

          {estado.carga === "error" ? (
            <Panel className="space-y-5">
              <TituloPanel sobretitulo="No se pudo continuar">La misión no se cargó</TituloPanel>
              <Aviso tono="error" urgente>
                {estado.mensajeError ?? "No se pudo cargar la misión."}
              </Aviso>
              <div className="flex flex-wrap gap-3">
                <Boton variante="primaria" onClick={acciones.reintentarCarga}>
                  Reintentar
                </Boton>
                <Boton variante="secundaria" onClick={acciones.volverAGrado}>
                  Elegir otro grado
                </Boton>
                <EnlaceBoton href="/" variante="sutil">
                  Salir al inicio
                </EnlaceBoton>
              </div>
            </Panel>
          ) : null}

          {estado.paso === "entrada" ? <PantallaEntrada onComenzar={acciones.comenzar} /> : null}

          {estado.paso === "grado" ? (
            <PantallaGrado
              gradoMarcado={estado.gradoMarcado}
              mensajeError={estado.mensajeError}
              onMarcar={acciones.marcarGrado}
              onConfirmar={acciones.confirmarGrado}
            />
          ) : null}

          {estado.paso === "instrucciones" && mision ? (
            <PantallaInstrucciones
              titulo={mision.titulo}
              premisa={mision.premisa}
              instrucciones={mision.instrucciones}
              onContinuar={() => acciones.irA("mapa")}
              onVolverAGrado={acciones.volverAGrado}
            />
          ) : null}

          {estado.paso === "mapa" && mision ? (
            <PantallaMapa zona={mision.zona} onContinuar={() => acciones.irA("contexto")} />
          ) : null}

          {estado.paso === "contexto" && mision ? (
            <PantallaContexto
              mision={mision}
              onContinuar={() => acciones.irA("reto")}
              onVolverAlMapa={() => acciones.irA("mapa")}
            />
          ) : null}

          {estado.paso === "reto" && mision && reto ? (
            <PantallaReto
              reto={reto}
              zona={mision.zona}
              numero={estado.indiceReto + 1}
              total={mision.retos.length}
              seleccion={estado.seleccion}
              enviando={estado.enviando}
              mensajeError={estado.mensajeError}
              onMarcar={(id) =>
                acciones.marcarOpcion(id, reto.tipo === "fuentes" && reto.seleccionMultiple)
              }
              onResponder={() => void acciones.responder()}
              onVolverAlContexto={() => acciones.irA("contexto")}
            />
          ) : null}

          {estado.paso === "feedback" && estado.veredicto ? (
            <PantallaFeedbackEnvuelta
              flujo={flujo}
              onVolverAFuente={() => acciones.irA("contexto")}
            />
          ) : null}

          {estado.paso === "cierre" && mision ? (
            <PantallaCierre
              cierre={mision.cierre}
              retos={mision.retos}
              xpJuego={estado.xpJuego}
              onReiniciar={acciones.reiniciar}
            />
          ) : null}
        </div>
      </main>

      {estado.panel === "pausa" ? (
        <MenuPausa onRetomar={acciones.cerrarPanel} onReiniciar={acciones.reiniciar} />
      ) : null}

      {estado.panel === "ayuda" ? (
        <PanelAyuda
          ayuda={estado.ayudaVisible}
          cargando={estado.pidiendoAyuda}
          ayudasRestantes={ayudasRestantes}
          onPedirOtra={() => void acciones.pedirAyuda()}
          onCerrar={acciones.cerrarPanel}
        />
      ) : null}

      {estado.panel === "controles" && mision ? (
        <Dialogo
          titulo="Instrucciones y controles"
          descripcion="Puedes volver aquí en cualquier momento sin perder tu avance."
          onCerrar={acciones.cerrarPanel}
          acciones={
            <Boton variante="primaria" onClick={acciones.cerrarPanel}>
              Volver al reto
            </Boton>
          }
        >
          <section className="space-y-2">
            <h3 className="font-bold text-tinta">Tu objetivo</h3>
            <p className="text-tinta">{mision.instrucciones.objetivo}</p>
          </section>
          <section className="space-y-2">
            <h3 className="font-bold text-tinta">Con teclado</h3>
            <ul className="space-y-1 text-sm text-tinta">
              {mision.instrucciones.controlesTeclado.map((linea) => (
                <li key={linea}>{linea}</li>
              ))}
            </ul>
          </section>
          <section className="space-y-2">
            <h3 className="font-bold text-tinta">Con pantalla táctil</h3>
            <ul className="space-y-1 text-sm text-tinta">
              {mision.instrucciones.controlesTactiles.map((linea) => (
                <li key={linea}>{linea}</li>
              ))}
            </ul>
          </section>
        </Dialogo>
      ) : null}
    </div>
  );
}

/** Envoltura pequeña para no repetir las guardas de nulos en el árbol principal. */
function PantallaFeedbackEnvuelta({
  flujo,
  onVolverAFuente,
}: {
  flujo: ReturnType<typeof useFlujoMision>;
  onVolverAFuente: () => void;
}) {
  const { estado, acciones, esUltimoReto } = flujo;
  if (!estado.veredicto) return null;

  return (
    <PanelFeedback
      veredicto={estado.veredicto}
      esUltimoReto={esUltimoReto}
      onReintentar={acciones.reintentar}
      onContinuar={acciones.continuar}
      onVolverAFuente={onVolverAFuente}
    />
  );
}
