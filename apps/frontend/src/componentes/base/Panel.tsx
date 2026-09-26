import type { ReactNode } from "react";

export interface PropiedadesPanel {
  children: ReactNode;
  /** `tenue` para paneles secundarios dentro de otro panel. */
  fondo?: "superficie" | "tenue";
  className?: string;
  como?: "section" | "div" | "article" | "li";
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

export function Panel({
  children,
  fondo = "superficie",
  className = "",
  como: Como = "section",
  ...resto
}: PropiedadesPanel) {
  return (
    <Como
      className={[
        "rounded-lg border-2 border-borde p-5 sm:p-7",
        fondo === "superficie" ? "bg-superficie shadow-panel" : "bg-superficie-alt",
        className,
      ].join(" ")}
      {...resto}
    >
      {children}
    </Como>
  );
}

export function TituloPanel({
  id,
  children,
  sobretitulo,
}: {
  id?: string;
  children: ReactNode;
  sobretitulo?: string;
}) {
  return (
    <header className="space-y-1">
      {sobretitulo ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tinta-suave">{sobretitulo}</p>
      ) : null}
      <h2 id={id} className="text-xl font-bold text-tinta sm:text-2xl">
        {children}
      </h2>
    </header>
  );
}
