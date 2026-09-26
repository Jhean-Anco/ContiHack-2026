# Modelo de dominio (propuesta)

## Estado del repositorio

No hay entidades del juego en TypeScript ni modelos Prisma del dominio. `apps/backend/prisma/schema.prisma` declara PostgreSQL sin tablas propias del producto. Lo siguiente es lenguaje conceptual para orientar contratos; no es un esquema implementado ni aprobado.

## Contextos propuestos

**Contenido editorial:** `Zona`, `Personaje`, `Mision`, `Reto`, `VarianteReto`, `RespuestaEsperada`, `Criterio`, `Ayuda`, `Feedback`, `ObjetivoInterno`, `MapeoCurricular`, `Fuente`, `Recurso` y `VersionContenido`. Contenido se sirve en versión revisada; los datos se separan de componentes Next/React.

**Sesión temporal de juego:** `SesionLocal`, `SelecciónGrado`, `EstadoMision`, `IntentoTemporal`, `RecompensaXP`. La propuesta inicial no requiere cuenta, identificador persistente ni almacenamiento PostgreSQL; puede vivir en memoria y reiniciarse al salir/recargar.

**Evidencia pedagógica:** aún no existe requisito para recolectarla o persistirla. Si se justifica en el futuro, debe definirse finalidad, base/consentimiento aplicable, minimización, acceso, retención y borrado antes de diseñar una entidad.

## Invariantes de diseño

- `contentVersion` viaja con el contenido y con cualquier evidencia que se apruebe persistir.
- Estado de sesión/recompensa y evidencia pedagógica nunca se derivan uno del otro; XP no actualiza dominio.
- La respuesta y feedback usan reglas deterministas y versionadas; no almacenar texto libre por defecto.
- Un mapeo curricular apunta a fuente/versión/localizador/revisión y puede estar vacío; la falta no impide etiquetar objetivo interno.
- Identificadores aleatorios no eliminan el riesgo de privacidad si hay combinación/reidentificación.
- Cambios de estado tienen origen, precondición y resultado definido; historial no se reescribe silenciosamente.

## Posible persistencia futura

Solo tras ADR y revisión de privacidad: definir si se guardará contenido editorial, progreso anónimo o avance asociado a identidad; separar claves/roles, plazos de retención, borrado, backup/restauración y migración; documentar modelo Prisma y restricciones; probar migración desde esquema vacío con datos sintéticos. No usar tablas como substituto de un CMS sin caso de uso.
