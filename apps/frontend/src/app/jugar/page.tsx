import type { Metadata } from "next";

import { JuegoMision } from "@/pantallas/JuegoMision";

export const metadata: Metadata = {
  title: "Misión",
  description:
    "Misión de prueba con fichas de fuentes y recorrido en un esquema. Sin cuenta y sin guardar datos.",
};

export default function PaginaJugar() {
  return <JuegoMision />;
}
