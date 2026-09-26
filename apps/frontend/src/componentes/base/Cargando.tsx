/**
 * Estado de carga. El texto es la señal principal; la animación solo acompaña y
 * queda neutralizada por `prefers-reduced-motion` desde globals.css.
 */
export function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 text-tinta-suave">
      <span
        aria-hidden="true"
        className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-borde-fuerte border-t-transparent motion-reduce:animate-none"
      />
      <span className="font-medium">{texto}</span>
    </div>
  );
}
