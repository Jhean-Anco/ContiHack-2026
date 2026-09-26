"use client";

import { useEffect, useState } from "react";

type EstadoApi = "conectando" | "disponible" | "sin-conexion";

export default function Inicio() {
  const [estadoApi, setEstadoApi] = useState<EstadoApi>("conectando");
  const [baseDatos, setBaseDatos] = useState("verificando");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
    fetch(`${apiUrl}/api/health`)
      .then(async (respuesta) => {
        if (!respuesta.ok) throw new Error("La API respondió con error");
        const estado = (await respuesta.json()) as { database?: string };
        setEstadoApi("disponible");
        setBaseDatos(estado.database ?? "desconocida");
      })
      .catch(() => {
        setEstadoApi("sin-conexion");
        setBaseDatos("sin conexión");
      });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">ContiHack 2026</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Proyecto listo para construir</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Frontend Next.js, API NestJS, Prisma ORM y PostgreSQL conectados mediante Docker Compose.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <EstadoServicio nombre="API NestJS" estado={estadoApi === "disponible" ? "disponible" : estadoApi === "conectando" ? "conectando" : "sin conexión"} />
          <EstadoServicio nombre="PostgreSQL" estado={baseDatos} />
        </div>
      </section>
    </main>
  );
}

function EstadoServicio({ nombre, estado }: { nombre: string; estado: string }) {
  const activo = estado === "disponible" || estado === "connected";
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{nombre}</p>
      <p className="mt-2 flex items-center gap-2 font-semibold text-slate-900">
        <span className={`h-2.5 w-2.5 rounded-full ${activo ? "bg-emerald-500" : "bg-amber-400"}`} aria-hidden="true" />
        {estado}
      </p>
    </div>
  );
}
