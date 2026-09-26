"use client";

import { Aviso } from "@/componentes/base/Aviso";
import { Boton } from "@/componentes/base/Boton";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import { SelectorGrado } from "@/componentes/juego/SelectorGrado";
import type { Grado } from "@/servicios/contratos";

export function PantallaGrado({
  gradoMarcado,
  mensajeError,
  onMarcar,
  onConfirmar,
}: {
  gradoMarcado: Grado | null;
  mensajeError: string | null;
  onMarcar: (grado: Grado) => void;
  onConfirmar: () => void;
}) {
  return (
    <Panel aria-labelledby="titulo-grado" className="space-y-6">
      <TituloPanel id="titulo-grado" sobretitulo="Paso previo">
        Elige tu grado para esta sesión
      </TituloPanel>

      <SelectorGrado gradoMarcado={gradoMarcado} onMarcar={onMarcar} />

      {mensajeError ? (
        <Aviso tono="error" urgente>
          {mensajeError}
        </Aviso>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" tamano="grande" onClick={onConfirmar}>
          Continuar
        </Boton>
        <EnlaceBoton href="/" variante="sutil" tamano="grande">
          Salir al inicio
        </EnlaceBoton>
      </div>

      <p className="text-sm text-tinta-suave">
        La variante que verás cambia la cantidad de fichas y de recorridos. Es una diferencia de
        estructura del prototipo, no una medida de tu nivel.
      </p>
    </Panel>
  );
}
