# Desarrollo local

## Requisitos

- Git
- Node.js compatible con las versiones de Next.js y NestJS declaradas en los manifiestos de cada aplicación
- Docker Desktop con el motor de contenedores iniciado

## Levantar el entorno completo

1. Crea un archivo `.env` a partir de `.env.example` si todavía no existe.
2. Cambia `POSTGRES_PASSWORD` y actualiza la contraseña correspondiente en `DATABASE_URL`.
3. Desde la raíz del repositorio, ejecuta:

   ```bash
   docker compose up --build
   ```

4. Abre `http://localhost:3000`. La página inicial muestra el estado de la API y de PostgreSQL.

Para ejecutar Compose en segundo plano:

```bash
docker compose up --build --detach
```

Para seguir los registros:

```bash
docker compose logs --follow
```

## Desarrollo de una aplicación por separado

Instala primero las dependencias dentro de la carpeta de la aplicación:

```bash
cd apps/backend
npm install
npm run start:dev
```

```bash
cd apps/frontend
npm install
npm run dev
```

Si se ejecuta la API directamente en Windows, `DATABASE_URL` debe usar `localhost` como host de PostgreSQL. Dentro de Docker, el host de la base de datos es el nombre de servicio `db`.

## Prisma y cambios de esquema

Desde `apps/backend`, modifica `prisma/schema.prisma` y crea una migración de desarrollo:

```bash
npx prisma migrate dev --name nombre_del_cambio
```

El comando también actualiza el cliente generado. No agregues el cliente generado a Git; la carpeta está ignorada por `.gitignore`.
