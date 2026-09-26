# Arquitectura

## Organización

El proyecto usa un solo repositorio Git con las aplicaciones separadas por responsabilidad:

```text
apps/
  frontend/    Interfaz web con Next.js, React y Tailwind CSS
  backend/     API REST con NestJS y Prisma ORM
docs/          Documentación del proyecto
compose.yaml   Entorno local con PostgreSQL, API y frontend
```

## Servicios

| Servicio | Tecnología | Dirección local | Responsabilidad |
| --- | --- | --- | --- |
| Frontend | Next.js, React, Tailwind CSS | `http://localhost:3000` | Interfaz web. Consulta el endpoint de salud de la API al cargar la página inicial. |
| Backend | NestJS, Prisma ORM | `http://localhost:3001` | API REST. El prefijo común de rutas es `/api`. |
| PostgreSQL | PostgreSQL 17 | `localhost:5432` | Persistencia relacional. Los datos locales se guardan en un volumen Docker. |

## Comunicación

El navegador carga el frontend y consulta `GET /api/health` en el backend. El endpoint ejecuta una consulta `SELECT 1` con Prisma; responde con el estado del servicio y de la conexión a PostgreSQL.

El esquema Prisma está en `apps/backend/prisma/schema.prisma`. Aún no hay modelos del dominio: se añadirán cuando se definan las entidades del proyecto. Las migraciones se guardan en `apps/backend/prisma/migrations/`.

## Configuración de desarrollo

Docker Compose define los tres servicios en `compose.yaml`. La API espera a que la base de datos esté saludable antes de arrancar. El frontend espera a que la API responda a su comprobación de salud.
