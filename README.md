# ContiHack 2026

Monorepo para el frontend, la API y la base de datos del proyecto.

El producto es un videojuego educativo web para estudiantes de Educación Secundaria del Perú. Ya cuenta con una primera interfaz `/jugar`, una misión lógica de muestra y conexión API preparada; las fichas son sintéticas y no hay verificación backend/runtime todavía. Consulta el [índice de documentación](docs/README.md) para el alcance, la pedagogía, las fuentes curriculares y la arquitectura.

- Frontend: Next.js, React y Tailwind CSS.
- Backend: NestJS, Prisma ORM y PostgreSQL.
- Entorno local: Docker Compose.

## Inicio rápido

1. Crea `.env` copiando `.env.example` y configura la contraseña local de PostgreSQL junto con `DATABASE_URL`.
2. Ejecuta `docker compose up --build`.
3. Abre <http://localhost:3000>.

## Documentación

Consulta el [índice de documentación](docs/README.md) para la arquitectura, la configuración, el desarrollo local, Docker y GitHub.

## Verificación del frontend

En `apps/frontend`: `npm run tipos`, `npm run lint`, `npm run build` y `npm run prueba:humo` (recorre el flujo de misión en Node, sin dependencias nuevas). No sustituyen la revisión manual de accesibilidad ni la validación curricular e histórica del contenido, que siguen pendientes.
