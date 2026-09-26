"use client";

import { Boton } from "@/componentes/base/Boton";
import { Panel, TituloPanel } from "@/componentes/base/Panel";
import type { Instrucciones } from "@/servicios/contratos";

export function PantallaInstrucciones({
  titulo,
  premisa,
  instrucciones,
  onContinuar,
  onVolverAGrado,
}: {
  titulo: string;
  premisa: string;
  instrucciones: Instrucciones;
  onContinuar: () => void;
  onVolverAGrado: () => void;
}) {
  return (
    <Panel aria-labelledby="titulo-instrucciones" className="space-y-6">
      <TituloPanel id="titulo-instrucciones" sobretitulo="Cómo se juega">
        {titulo}
      </TituloPanel>

      <p className="max-w-[68ch] text-lg text-tinta">{premisa}</p>

      <section aria-labelledby="objetivo-mision" className="space-y-2">
        <h3 id="objetivo-mision" className="text-base font-bold text-tinta">
          Tu objetivo
        </h3>
        <p className="max-w-[68ch] text-tinta">{instrucciones.objetivo}</p>
      </section>

      <section aria-labelledby="pasos-mision" className="space-y-2">
        <h3 id="pasos-mision" className="text-base font-bold text-tinta">
          Qué vas a hacer
        </h3>
        <ol className="max-w-[68ch] space-y-2">
          {instrucciones.pasos.map((paso, i) => (
            <li key={paso} className="flex gap-3 text-tinta">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-borde-fuerte text-sm font-bold"
              >
                {i + 1}
              </span>
              <span>{paso}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <ListaControles titulo="Con teclado" items={instrucciones.controlesTeclado} />
        <ListaControles titulo="Con pantalla táctil" items={instrucciones.controlesTactiles} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" tamano="grande" onClick={onContinuar}>
          Ver el esquema de la zona
        </Boton>
        <Boton variante="sutil" tamano="grande" onClick={onVolverAGrado}>
          Cambiar de grado
        </Boton>
      </div>
    </Panel>
  );
}

function ListaControles({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <section className="space-y-2 rounded-md border-2 border-borde bg-superficie-alt p-4">
      <h3 className="text-base font-bold text-tinta">{titulo}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-tinta">
            <span aria-hidden="true" className="font-bold text-tinta-suave">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
