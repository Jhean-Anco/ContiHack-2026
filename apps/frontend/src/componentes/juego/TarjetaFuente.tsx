import { Etiqueta } from "@/componentes/base/Etiqueta";
import type { TarjetaFuente as DatosFuente } from "@/servicios/contratos";

/**
 * Ficha de fuente. La procedencia se muestra siempre y con palabras, no con color:
 * una ficha pendiente de validación no puede parecer equivalente a una verificada
 * (docs/01-pedagogia/trazabilidad-curricular.md).
 */
export function TarjetaFuente({ fuente }: { fuente: DatosFuente }) {
  const pendiente = fuente.estadoProvenance === "pendiente_de_validacion";

  return (
    <article className="space-y-3 rounded-md border-2 border-borde bg-superficie p-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Etiqueta tono={pendiente ? "pendiente" : "verificada"}>
            {pendiente ? "Procedencia pendiente de validación" : "Procedencia declarada"}
          </Etiqueta>
        </div>
        <h3 className="text-lg font-bold text-tinta">{fuente.titulo}</h3>
        <dl className="grid gap-x-4 gap-y-1 text-sm text-tinta-suave sm:grid-cols-[auto_1fr]">
          <dt className="font-semibold text-tinta">Autoría</dt>
          <dd>{fuente.autoria}</dd>
          <dt className="font-semibold text-tinta">Fecha</dt>
          <dd>{fuente.fecha}</dd>
          <dt className="font-semibold text-tinta">Contexto</dt>
          <dd>{fuente.contexto}</dd>
          {fuente.localizador ? (
            <>
              <dt className="font-semibold text-tinta">Localizador</dt>
              <dd>{fuente.localizador}</dd>
            </>
          ) : null}
        </dl>
      </header>

      <blockquote className="border-l-4 border-borde-fuerte pl-4 font-historica text-lg leading-relaxed text-tinta">
        {fuente.fragmento}
      </blockquote>

      {fuente.nota ? (
        <p className="rounded-sm border-2 border-aviso bg-aviso-fondo p-3 text-sm text-tinta">
          <span className="font-semibold">Nota editorial: </span>
          {fuente.nota}
        </p>
      ) : null}
    </article>
  );
}
