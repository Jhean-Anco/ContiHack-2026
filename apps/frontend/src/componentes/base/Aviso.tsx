import type { ReactNode } from "react";

type Tono = "info" | "aviso" | "error" | "exito";

/**
 * Mensaje de estado. Cada tono lleva una palabra y un símbolo además del color,
 * para no comunicar con color únicamente.
 */
export interface PropiedadesAviso {
  tono?: Tono;
  titulo?: string;
  /** `alerta` lo anuncia de inmediato; úsalo solo para errores que interrumpen. */
  urgente?: boolean;
  children: ReactNode;
  className?: string;
}

const porTono: Record<Tono, { marco: string; texto: string; simbolo: string; palabra: string }> = {
  info: {
    marco: "border-info bg-info-fondo",
    texto: "text-tinta",
    simbolo: "i",
    palabra: "Información",
  },
  aviso: {
    marco: "border-aviso bg-aviso-fondo",
    texto: "text-tinta",
    simbolo: "!",
    palabra: "Aviso",
  },
  error: {
    marco: "border-error bg-error-fondo",
    texto: "text-tinta",
    simbolo: "×",
    palabra: "Error",
  },
  exito: {
    marco: "border-exito bg-exito-fondo",
    texto: "text-tinta",
    simbolo: "✓",
    palabra: "Listo",
  },
};

export function Aviso({ tono = "info", titulo, urgente = false, children, className = "" }: PropiedadesAviso) {
  const estilo = porTono[tono];
  return (
    <div
      role={urgente ? "alert" : "status"}
      className={[
        "flex gap-3 rounded-md border-2 border-l-8 p-4",
        estilo.marco,
        estilo.texto,
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current text-sm font-bold"
      >
        {estilo.simbolo}
      </span>
      <div className="min-w-0 space-y-1">
        <p className="font-semibold">
          <span className="solo-lectores">{estilo.palabra}: </span>
          {titulo ?? estilo.palabra}
        </p>
        <div className="text-sm leading-relaxed text-tinta-suave">{children}</div>
      </div>
    </div>
  );
}
