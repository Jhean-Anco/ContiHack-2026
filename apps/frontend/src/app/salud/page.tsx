"use client";

import { useEffect, useState } from "react";

import { EnlaceBoton } from "@/componentes/base/EnlaceBoton";
import { Etiqueta } from "@/componentes/base/Etiqueta";
import { Panel, TituloPanel } from "@/componentes/base/Panel";

/**
 * Página técnica de salud de servicios.
 *
 * Es la pantalla del scaffold, conservada y movida aquí para dejar la raíz al
 * producto. No es parte del juego ni describe estado de misión.
 */
type EstadoApi = "conectando" | "disponible" | "sin-conexion";

export default function PaginaSalud() {
  const [estadoApi, setEstadoApi] = useState<EstadoApi>("conectando");
  const [baseDatos, setBaseDatos] = useState("verificando");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
    const control = new AbortController();

    fetch(`${apiUrl}/api/health`, { signal: control.signal })
      .then(async (respuesta) => {
        if (!respuesta.ok) throw new Error("La API respondió con error");
        const estado = (await respuesta.json()) as { database?: string };
        setEstadoApi("disponible");
        setBaseDatos(estado.database ?? "desconocida");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setEstadoApi("sin-conexion");
        setBaseDatos("sin conexión");
      });

    return () => control.abort();
  }, []);

  return (
    <main id="contenido" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Panel className="space-y-6">
        <TituloPanel sobretitulo="Página técnica">Salud de los servicios</TituloPanel>
        <p className="text-tinta-suave">
          Comprueba la conexión entre el frontend, la API NestJS y PostgreSQL. No refleja el estado de
          ninguna misión.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <EstadoServicio
            nombre="API NestJS"
            estado={
              estadoApi === "disponible"
                ? "disponible"
                : estadoApi === "conectando"
                  ? "conectando"
                  : "sin conexión"
            }
          />
          <EstadoServicio nombre="PostgreSQL" estado={baseDatos} />
        </div>

        <EnlaceBoton href="/" variante="secundaria">
          Volver al inicio
        </EnlaceBoton>
      </Panel>
    </main>
  );
}

function EstadoServicio({ nombre, estado }: { nombre: string; estado: string }) {
  const activo = estado === "disponible" || estado === "connected";
  return (
    <div className="space-y-2 rounded-md border-2 border-borde bg-superficie-alt p-4">
      <p className="text-sm text-tinta-suave">{nombre}</p>
      <p className="font-semibold text-tinta">
        <Etiqueta tono={activo ? "verificada" : "pendiente"}>
          {activo ? "Conectado" : "Sin confirmar"}
        </Etiqueta>
        <span className="mt-2 block">{estado}</span>
      </p>
    </div>
  );
}
