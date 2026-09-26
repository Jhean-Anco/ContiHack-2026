# Arquitectura

## Estado actual observado

Monorepo npm con `apps/frontend` (Next.js 16, React 19, TypeScript, Tailwind 4) y `apps/backend` (NestJS 11, Prisma 7, PostgreSQL/pg). `compose.yaml` orquesta PostgreSQL 17, API y web. API expone `GET /api/health`; Prisma schema declara PostgreSQL sin modelos del dominio. No hay autenticación, API de juego, motor de contenido, perfiles, analítica ni módulos de dominio.

## Dirección objetivo recomendada (documentada, no implementada)

Mantener el stack actual sin añadir framework: aplicación Next.js/React consume API REST de NestJS con TypeScript; el contenido inicial vive como datos TypeScript tipados en el backend y Nest lo sirve por API. Esto mantiene contenido/currículo fuera de la UI y bajo control de versiones. Prisma/PostgreSQL quedan para persistencia que se justifique (p. ej. progreso) después de decidir identidad, consentimiento, retención y minimización. El vertical slice inicial puede funcionar sin almacenar datos personales ni crear tablas de dominio. Compose sigue siendo entorno local; producción queda fuera hasta ADR.

Los contratos concretos están en [API](api.md), [frontend](frontend.md), [backend y BD](backend-bd.md), [modelo de dominio](modelo-dominio.md), [estados y eventos](estados-eventos.md) y [seguridad](seguridad.md). La integración Gemini para respuestas dinámicas debe usar el backend NestJS y el alcance de [ADR 0003](adrs/0003-proveedores-ia-y-activos-generados.md); el dominio sigue como propuesta sin entidades implementadas.

## Documentos

- [Arquitectura general](arquitectura-general.md)
- [Frontend](frontend.md)
- [Backend y base de datos](backend-bd.md)
- [Modelo de dominio](modelo-dominio.md)
- [Contratos API](api.md)
- [Estados y eventos](estados-eventos.md)
- [Seguridad](seguridad.md)
- [ADRs](adrs/README.md)

Las guías de ejecución que ya existían siguen en [arquitectura técnica](../arquitectura.md), [configuración](../configuracion.md), [desarrollo local](../desarrollo-local.md) y [Docker](../docker.md).
