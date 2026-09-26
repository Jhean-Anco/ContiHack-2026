import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ContiHack 2026",
    template: "%s · ContiHack 2026",
  },
  description:
    "Prototipo de videojuego educativo web para Educación Secundaria, en construcción. El contenido histórico y curricular está sin validar.",
};

/** Sin `maximum-scale`: el zoom del navegador debe seguir funcionando. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="salto-contenido">
          Ir al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
