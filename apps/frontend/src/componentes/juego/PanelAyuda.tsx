"use client";

import { Boton } from "@/componentes/base/Boton";
import { Cargando } from "@/componentes/base/Cargando";
import { Dialogo } from "@/componentes/base/Dialogo";
import { Etiqueta } from "@/componentes/base/Etiqueta";
import type { Ayuda } from "@/servicios/contratos";

const ORIGEN: Record<Ayuda["origen"], string> = {
  catalogo: "Pista escrita y revisada en el catálogo",
  simulada: "Pista simulada del prototipo",
  gemini: "Pista generada por un modelo, con opciones cerradas",
};

/**
 * Pista del reto.
 *
 * La pista la entrega el servidor; aquí solo se muestra, junto con su origen: quien
 * lea la pantalla debe poder distinguir una pista revisada de una generada.
 */
export function PanelAyuda({
  ayuda,
  cargando,
  ayudasRestantes,
  onPedirOtra,
  onCerrar,
}: {
  ayuda: Ayuda | null;
  cargando: boolean;
  ayudasRestantes: number;
  onPedirOtra: () => void;
  onCerrar: () => void;
}) {
  return (
    <Dialogo
      titulo="Pista"
      descripcion="Pedir una pista no resta nada ni cambia tu respuesta."
      onCerrar={onCerrar}
      acciones={
        <>
          <Boton variante="primaria" onClick={onCerrar}>
            Volver al reto
          </Boton>
          {ayudasRestantes > 0 ? (
            <Boton variante="secundaria" onClick={onPedirOtra} ocupado={cargando}>
              Pedir otra pista ({ayudasRestantes})
            </Boton>
          ) : (
            <p className="self-center text-sm text-tinta-suave">
              No quedan más pistas en este reto. Puedes volver a las fichas o al esquema.
            </p>
          )}
        </>
      }
    >
      {cargando ? <Cargando texto="Buscando una pista…" /> : null}

      {!cargando && ayuda ? (
        <div className="space-y-3">
          <p className="text-lg text-tinta">{ayuda.texto}</p>
          <Etiqueta tono={ayuda.origen === "catalogo" ? "verificada" : "pendiente"}>
            {ORIGEN[ayuda.origen]}
          </Etiqueta>
        </div>
      ) : null}

      {!cargando && !ayuda ? (
        <p className="text-tinta-suave">No hay una pista disponible en este momento.</p>
      ) : null}
    </Dialogo>
  );
}
