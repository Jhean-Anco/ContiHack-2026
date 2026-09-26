import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primaria" | "secundaria" | "sutil" | "peligro";
type Tamano = "normal" | "grande";

export interface PropiedadesBoton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
  /** Marca de estado que además queda anunciada por `aria-busy`. */
  ocupado?: boolean;
  children: ReactNode;
}

const porVariante: Record<Variante, string> = {
  primaria:
    "bg-accion text-accion-tinta border-transparent hover:bg-accion-hover " +
    "disabled:bg-superficie-alt disabled:text-tinta-suave disabled:border-borde",
  secundaria:
    "bg-superficie text-tinta border-borde-fuerte hover:bg-superficie-alt " +
    "disabled:text-tinta-suave disabled:border-borde",
  sutil:
    "bg-transparent text-tinta border-transparent underline decoration-2 underline-offset-4 " +
    "hover:bg-superficie-alt disabled:text-tinta-suave disabled:no-underline",
  peligro:
    "bg-superficie text-error border-error hover:bg-error-fondo " +
    "disabled:text-tinta-suave disabled:border-borde",
};

const porTamano: Record<Tamano, string> = {
  // El mínimo táctil sale del token --ch-blanco-tactil (2.75rem = 44px).
  normal: "min-h-[2.75rem] px-4 text-base",
  grande: "min-h-[3.25rem] px-6 text-lg",
};

export function Boton({
  variante = "secundaria",
  tamano = "normal",
  ocupado = false,
  className = "",
  type = "button",
  disabled,
  children,
  ...resto
}: PropiedadesBoton) {
  return (
    <button
      type={type}
      aria-busy={ocupado || undefined}
      disabled={disabled || ocupado}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md border-2 font-semibold",
        "transition-colors duration-150 disabled:cursor-not-allowed",
        porVariante[variante],
        porTamano[tamano],
        className,
      ].join(" ")}
      {...resto}
    >
      {children}
    </button>
  );
}
