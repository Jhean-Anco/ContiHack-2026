"use client";

import { Aviso } from "@/componentes/base/Aviso";
import { Boton } from "@/componentes/base/Boton";
import { Dialogo } from "@/componentes/base/Dialogo";
import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";

/**
 * Pausa y salida.
 *
 * Pausar no penaliza y no hay cronómetro que siga corriendo. Antes de salir avisa
 * que la misión se reinicia, porque el prototipo no guarda progreso.
 */
export function MenuPausa({ onRetomar, onReiniciar }: { onRetomar: () => void; onReiniciar: () => void }) {
  return (
    <Dialogo
      titulo="Misión en pausa"
      descripcion="Puedes quedarte aquí el tiempo que necesites. Nada se pierde por pausar."
      onCerrar={onRetomar}
    >
      <Aviso tono="aviso" titulo="Salir reinicia la misión">
        Este prototipo no guarda progreso. Si sales o recargas la página, la misión vuelve a empezar
        desde el inicio.
      </Aviso>

      <div className="flex flex-wrap gap-3">
        <Boton variante="primaria" onClick={onRetomar}>
          Retomar la misión
        </Boton>
        <Boton variante="secundaria" onClick={onReiniciar}>
          Empezar de nuevo
        </Boton>
        <EnlaceBoton href="/" variante="sutil">
          Salir al inicio
        </EnlaceBoton>
      </div>
    </Dialogo>
  );
}
