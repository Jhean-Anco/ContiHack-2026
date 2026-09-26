# Configuración

Las variables de entorno del entorno local se definen en `.env`, en la raíz del repositorio. `.env` está excluido de Git. Usa `.env.example` como plantilla y no publiques contraseñas reales.

| Variable | Uso | Valor local de ejemplo |
| --- | --- | --- |
| `POSTGRES_DB` | Nombre de la base de datos que crea el contenedor PostgreSQL. | `contihack` |
| `POSTGRES_USER` | Usuario de la base de datos. | `contihack` |
| `POSTGRES_PASSWORD` | Contraseña local de PostgreSQL. | Reemplaza el valor de plantilla. |
| `DATABASE_URL` | Conexión Prisma a PostgreSQL. En Docker, el host es `db`. | `postgresql://usuario:clave@db:5432/contihack?schema=public` |
| `API_PORT` | Puerto del host que publica la API. El puerto dentro del contenedor permanece en `3001`. | `3001` |
| `FRONTEND_URL` | Origen permitido por CORS en el backend. | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Dirección de la API que usa el navegador. | `http://localhost:3001` |

La contraseña en `DATABASE_URL` debe coincidir con `POSTGRES_PASSWORD`. Para ejecutar backend y base de datos fuera de Docker, cambia el host `db` por `localhost`.
