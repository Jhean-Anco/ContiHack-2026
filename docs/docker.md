# Docker

## Servicios y puertos

`compose.yaml` define:

- `db`: PostgreSQL 17 en `localhost:5432` con comprobación mediante `pg_isready`.
- `backend`: API NestJS en `localhost:3001`; genera Prisma y aplica migraciones antes de iniciar el modo de desarrollo.
- `frontend`: Next.js en `localhost:3000`.

La API depende de que PostgreSQL esté saludable. El frontend depende de la comprobación de salud de la API.

## Datos y código

- `postgres_data` conserva la base de datos aunque se eliminen los contenedores.
- Los directorios de las aplicaciones están montados desde el repositorio para reflejar los cambios de código.
- Los volúmenes `backend_node_modules`, `backend_generated`, `frontend_node_modules` y `frontend_next` guardan dependencias, cliente Prisma y caché de desarrollo dentro de Docker.

## Comandos

Iniciar o reconstruir los servicios:

```bash
docker compose up --build
```

Detener y eliminar contenedores y red, conservando los datos:

```bash
docker compose down
```

Eliminar también los volúmenes, incluida la base de datos local:

```bash
docker compose down --volumes
```

`down --volumes` elimina los datos almacenados localmente en PostgreSQL.
