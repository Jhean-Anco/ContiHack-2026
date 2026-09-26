import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "primaria" | "secundaria" | "sutil";
type Tamano = "normal" | "grande";

const porVariante: Record<Variante, string> = {
  primaria: "bg-accion text-accion-tinta border-transparent hover:bg-accion-hover no-underline",
  secundaria: "bg-superficie text-tinta border-borde-fuerte hover:bg-superficie-alt no-underline",
  sutil:
    "bg-transparent text-tinta border-transparent underline decoration-2 underline-offset-4 hover:bg-superficie-alt",
};

const porTamano: Record<Tamano, string> = {
  normal: "min-h-[2.75rem] px-4 text-base",
  grande: "min-h-[3.25rem] px-6 text-lg",
};

/**
 * Enlace con aspecto de botón. Es un enlace de verdad, no un botón: navega, se
 * puede abrir en otra pestaña y se anuncia como enlace.
 */
export function EnlaceBoton({
  href,
  variante = "secundaria",
  tamano = "normal",
  className = "",
  children,
}: {
  href: string;
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md border-2 font-semibold",
        "transition-colors duration-150",
        porVariante[variante],
        porTamano[tamano],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
