import type { ReactNode } from "react";

type Tono = "neutra" | "verificada" | "pendiente" | "juego";

/**
 * Marca corta de estado. Lleva siempre texto legible: ninguna etiqueta depende
 * del color para entenderse.
 */
export function Etiqueta({
  tono = "neutra",
  children,
  className = "",
}: {
  tono?: Tono;
  children: ReactNode;
  className?: string;
}) {
  const porTono: Record<Tono, string> = {
    neutra: "border-borde-fuerte bg-superficie-alt text-tinta",
    verificada: "border-exito bg-exito-fondo text-tinta",
    pendiente: "border-aviso bg-aviso-fondo text-tinta trama-aviso",
    juego: "border-info bg-info-fondo text-tinta",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-sm border-2 px-2 py-0.5 text-xs font-semibold",
        porTono[tono],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
