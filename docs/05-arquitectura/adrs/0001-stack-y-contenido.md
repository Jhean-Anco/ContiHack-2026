# ADR 0001: conservar el stack y servir contenido versionado por Nest

- Estado: Aceptada como dirección técnica inicial documentada; no implementada.
- Fecha: 2026-09-26
- Decisores: solicitud de alinear documentación con el stack existente; aprobación de implementación pendiente de flujo de trabajo.

## Contexto

El repositorio es monorepo simple con Next.js/React/TypeScript/Tailwind CSS 4, NestJS/TypeScript, Prisma 7, adaptador PostgreSQL y Docker Compose con PostgreSQL 17. No hay workspace de paquetes, dominio de juego, modelos Prisma, validación runtime de DTO ni almacenamiento de contenido.

## Decisión

1. Next.js/React se mantiene como cliente web y consume JSON por HTTP.
2. NestJS mantiene el API REST bajo `/api` y será dueño del catálogo de contenido.
3. En el primer corte, el catálogo vive en datos TypeScript versionados dentro de `apps/backend/src/content/`; el backend solo expone contenido revisado/publicable.
4. PostgreSQL/Prisma no se amplía hasta que el producto requiera persistencia y se resuelvan minimización, identidad, consentimiento, retención y borrado.
5. No añadir tecnologías/servicios externos al stack sin justificarlo en otro ADR.

## Alternativas consideradas

- Duplicar contenido en frontend: descartado porque acopla UI y contenido y expone lógica curricular al cliente.
- Persistir todo el catálogo en PostgreSQL desde el inicio: diferido; no hay requisitos/editoría y aumentaría el modelo antes de validar el contenido.
- Introducir CMS, GraphQL o microservicios: descartados para el primer corte por falta de necesidad y dependencias.

## Consecuencias

La edición del contenido inicial pasa por revisión y despliegue del backend. Git proporciona historial/versiones; el API publica un `contentVersion`. Se requiere revisar estados editoriales antes de exponerlos. El avance de estudiante no persiste en el prototipo inicial. Si se necesita edición sin despliegue o persistencia de sesiones, abrir ADR y plan de migración.

## Verificación requerida al implementar

Contenido no duplicado en frontend; tipos y versión de catálogo en backend; API documentada; contenido pendiente no publicado; lint/build y pruebas correspondientes; ningún modelo de estudiante añadido por esta ADR.
