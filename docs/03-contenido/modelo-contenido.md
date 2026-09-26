# Modelo de contenido

## Forma de almacenamiento alineada al stack (primera versión)

No hay sistema editorial ni entidades implementadas. Para el primer vertical slice, alojar el catálogo como constantes/datos TypeScript versionados dentro de `apps/backend/src/content/` y devolverlo mediante controladores Nest REST. No se necesita una base nueva ni una librería de contenido; PostgreSQL/Prisma se reservan para persistencia justificada. Contratos HTTP se definen en [API](../05-arquitectura/api.md). El frontend consume JSON y no importa contenido desde el backend como paquete compartido.

Tipos de dominio/contenido propuestos: `Zona`, `Personaje`, `Mision`, `Reto`, `Respuesta`, `Feedback`, `Ayuda`, `ObjetivoInterno`, `MapeoCurricular`, `FuenteCurricular`, `Recurso` y `VersionContenido`. No representan tablas Prisma actuales. Cada paquete declara `contentVersion`, identificador estable, nivel/grado/ciclo, área y estado editorial. Referencias curriculares incluyen ID de fuente, norma, edición, localizador, revisión y estado. No publicar elementos curriculares sin verificar.

Una versión publicada es inmutable; toda corrección produce una nueva versión identificable en Git. Si el catálogo crece o se requiere edición sin despliegue, evaluar almacenamiento en PostgreSQL/Prisma con ADR, migraciones y permisos. No meter texto narrativo o currículo en columnas JSONB sin decidir cómo se valida, busca y versiona.

Estados editoriales documentales: `borrador`, `revision_pedagogica`, `revision_curricular`, `revision_cultural` (si aplica), `aprobado`, `publicado`, `retirado`. Ningún pendiente se sirve como oficial. Estos estados aún no tienen workflow ni mecanismo de enforcement en código.
