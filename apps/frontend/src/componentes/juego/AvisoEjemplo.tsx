import { Aviso } from "@/componentes/base/Aviso";
import type { AvisoContenido } from "@/servicios/contratos";

/**
 * Rótulo permanente de contenido de ejemplo.
 *
 * Mientras el catálogo servido sea andamio, la pantalla tiene que decirlo: nada de
 * lo que se lee es historia de Huancayo, alineación curricular ni cartografía real
 * (docs/07-agentes/reparto-claude-codex.md).
 */
export function AvisoEjemplo({ aviso, version }: { aviso: AvisoContenido; version?: string }) {
  if (!aviso.esEjemploFicticio) return null;

  return (
    <Aviso tono="aviso" titulo="Contenido de ejemplo, no validado">
      {aviso.texto}
      {version ? <span className="mt-1 block text-xs">Versión de contenido: {version}</span> : null}
    </Aviso>
  );
}
