# Backend y base de datos

## Implementado

Pruebas: `npm test` compila el backend y ejecuta `node --test` sin runner externo. Cubren las cinco variantes, el contrato de opciones, evaluación correcta/incorrecta, ayuda mock, fallback cuando falla el ledger y validación de `PORT`/`FRONTEND_URL`. `prisma.config.ts` exige `DATABASE_URL` para el build, pero compilar/generar cliente no conecta a PostgreSQL. Migraciones y rutas HTTP se verifican por separado.

NestJS 11 incluye `AppModule`, `HealthController`, `ContentModule` y `PrismaModule`; Prisma 7 usa `@prisma/adapter-pg` y paquete `pg`. Prisma Client se genera en `apps/backend/generated/prisma` (volumen `backend_generated` en Compose). El esquema define un único `AiBudgetLedger` agregado para el tope aprobado de IA; no contiene cuentas ni progreso del juego. La configuración de Prisma está en `prisma.config.ts`; migraciones en `apps/backend/prisma/migrations`. Nest registra prefijo global `/api`, CORS desde `FRONTEND_URL` y puerto interno `PORT` default 3001. Compose genera cliente, corre `prisma migrate deploy` y arranca `nest start --watch`.

## Convención de implementación alineada

Usar módulos Nest y controladores REST para nuevas capacidades; conservar reglas y decisiones de estado en servicios del backend. El catálogo inicial ya está declarado como TypeScript versionado en backend y expuesto por API. Evita crear modelos Prisma solo para que la arquitectura “parezca completa”: el esquema no debe incorporar progreso del juego hasta que haya necesidad e invariantes aprobadas.

Cuando se apruebe persistencia, modelar sesiones/avance mínimos según el análisis de privacidad; añadir relaciones y restricciones Prisma, migración versionada y datos sintéticos de desarrollo. Persistir `contentVersion` con cualquier evidencia para interpretación reproducible. Separar tablas/campos de XP del estado de aprendizaje. Definir autorización, retención, borrado, backup y restauración antes de almacenar datos de estudiantes.

No hay `class-validator`, `class-transformer`, Zod ni esquema de validación runtime entre dependencias actuales. Antes de aceptar payloads mutables, definir DTO/validación de servidor y decidir si se incorpora una dependencia mediante cambio documentado; no confiar solo en tipos TypeScript. No guardar PII, respuestas identificables o telemetría por inercia.
