# Arquitectura general

## Presente

`browser → Next.js` sirve `/`, `/jugar` y `/salud`. La interfaz `/jugar` consume el contrato HTTP de NestJS para leer el manifiesto y la misión, enviar respuestas deterministas y pedir ayuda. NestJS expone `/api/content/manifest`, `/api/content/missions/:id`, `/api/game/answer`, `/api/game/assistance` y `/api/health`; el último verifica PostgreSQL mediante Prisma 7 y `@prisma/adapter-pg`. El catálogo vive en TypeScript en backend. El esquema Prisma incluye únicamente el ledger agregado de presupuesto de IA, no cuentas ni progreso. Compose define Postgres, backend y frontend. La ejecución integrada aún requiere verificación de arranque y flujo HTTP.

## Dirección técnica implementada para el primer vertical slice

```text
Next.js App Router + React + Tailwind CSS
       │ fetch HTTP, JSON; URL desde NEXT_PUBLIC_API_URL
       ▼
NestJS REST (/api), TypeScript
  ├─ ContentModule/Controller/Service: catálogo, validación y evaluación
  ├─ adaptador Gemini opcional para pistas/diálogo acotados; mock por defecto
  └─ catálogo de contenido TypeScript versionado y sintético en el backend
       │ Prisma 7 + @prisma/adapter-pg, cuando haya persistencia aprobada
       ▼
PostgreSQL 17

Docker Compose: web + API + DB para desarrollo local
```

No hay monorepo workspace ni librería compartida configurada. Mantener contratos explícitos y verificarlos al borde de cada aplicación; no importar código interno de Nest en Next. La interfaz valida las respuestas JSON recibidas y presenta el veredicto del backend. El contenido está rotulado `synthetic-demo`; no representa historia de Huancayo validada ni alineación curricular aprobada. XP, progreso y aprendizaje no se infieren ni se guardan.

### Límites de responsabilidad

- **Next.js/React:** rutas, composición, interacción, estados de carga/error, accesibilidad. Tailwind CSS 4 para estilo. `NEXT_PUBLIC_API_URL` se expone al navegador y solo contiene URL pública, nunca secretos.
- **NestJS:** prefijo `/api`, controladores REST, servicios/reglas de aplicación, origen CORS configurable por `FRONTEND_URL`, y entrega del catálogo versionado.
- **Contenido inicial:** constantes/datos TypeScript en backend, con tipos y versión; sin base editorial ni importación desde cliente. Validar referencias curriculares y estados editoriales antes de servir contenido. Una futura fuente editable externa requiere ADR.
- **Persistencia:** Prisma 7 con adaptador PostgreSQL. El único modelo actual es `AiBudgetLedger`, agregado y sin datos de estudiantes. No guardar progreso sin necesidad aprobada y decisión de privacidad.
- **Compose:** servicio `db`, `backend`, `frontend`, sus health checks, volúmenes locales y variables documentadas. No equivale a despliegue productivo.

Evitar microservicios, GraphQL, Redis, colas, CMS, autenticación y paquetes adicionales: no están en el repo ni son necesarios para esta arquitectura inicial. Cualquier incorporación requiere necesidad, análisis y ADR.

## Límites

Sin diseño aprobado de cuentas, consentimiento, retención o alojamiento, no decidir persistencia identificable, analítica de menores ni deployment público. Ningún sistema registra datos escolares sensibles por defecto.
