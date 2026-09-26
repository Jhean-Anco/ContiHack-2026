# Implementación y roadmap

Roadmap en entregas verificables; no se inventan fechas ni se compromete una duración. El primer slice lógico de interfaz y API está implementado; su arranque integrado y el flujo HTTP todavía requieren verificación reproducible. Los hitos de validación pedagógica, curricular, histórica y de privacidad siguen pendientes. Stack: Next.js/React/TypeScript/Tailwind; NestJS/TypeScript REST; Prisma 7/PostgreSQL 17; Docker Compose local. No introducir otra plataforma sin ADR. Consulta la [matriz de preparación](preparacion-pmv.md) para distinguir el slice técnico de las aprobaciones pendientes.

1. **Definición y salvaguardas:** audiencia 1.º–5.º, Ciencias Sociales/Matemática y ancla en Plaza Constitución confirmadas; cerrar objetivo de cada grado, zona cartográfica de cuatro manzanas, narrativa basada en fuentes y salvaguardas antes de prueba con estudiantes.
2. **Catálogo y contrato — implementado:** tipos, catálogo sintético versionado y rutas REST de lectura en Nest; no implica provenance histórica ni revisión curricular.
3. **Vertical slice lógico — implementado; integración por verificar:** una misión con cinco variantes y dos retos, interfaz `/jugar`, feedback/reintento, validación determinista del servidor y asistencia mock. El mapa es esquemático y las fichas son ficticias.
4. **Calidad y evaluación — pendiente:** ejecutar lint/build de ambas apps y Compose con migraciones; comprobar respuestas correctas/incorrectas, ayuda mock, entradas inválidas y salud; revisar accesibilidad. Las pruebas de jugabilidad/currículo requieren responsables, protocolo y aprobaciones.
5. **Validación del nivel completo y decisión de datos:** revisar variantes de 1.º–5.º en los ciclos VI y VII y todas las áreas ya priorizadas. Solo si se necesita guardar progreso, ADR de modelo Prisma/consentimiento/retención/borrado antes de migrar.
6. **Despliegue:** después de cumplir gates, seleccionar ambiente/proveedor, secretos, HTTPS, backups, observabilidad segura y rollback mediante ADR. Compose local no se promociona a producción.

## Backlog inicial

- **P0:** definir el objetivo observable por grado en Ciencias Sociales y Matemática; cotejar fuentes curriculares y revisarlo con especialista.
- **P0:** fijar la zona cartográfica a máximo cuatro manzanas desde Plaza Constitución y validar calles/representación local.
- **P0:** documentar hechos históricos del primer reto con fuentes primarias/locales; resolver discrepancias antes de publicarlos.
- **P0:** acordar perfil de colaboración Codex/Claude, responsable/revisor por tarea, y salvaguardas antes de prueba con estudiantes.
- **P0:** revisión local de ambientación ficticia y licencia de recursos visuales.
- **P0:** ejecutar y registrar el arranque local integrado y la verificación HTTP del primer slice; reparar fallos de integración y mantener `AI_PROVIDER=mock`.
- **P1:** revisión curricular/histórica del contenido sintético y reemplazo solo con material con provenance aprobada.
- **P1:** acordar responsables, revisión de accesibilidad y salvaguardas antes de cualquier prueba con estudiantes.
- **P1:** definir/configurar runner compatible con manifests actuales antes de añadir pruebas automatizadas de dominio (no existe script `test`).
- **P2:** decidir si se requiere persistencia; ADR obligatorio antes de tablas, cuentas o analítica.
- **P2:** decidir hosting/producción por ADR; hoy solo está definido Compose local.

## Iteraciones de trabajo (sin calendario)

No hay equipo, capacidad ni cadencia informados; por eso se documentan cortes funcionales y no fechas ficticias. **Iteración A:** decisión pedagógica, normativa y de privacidad. **Iteración B:** contrato y catálogo servido desde Nest. **Iteración C:** misión jugable y usabilidad. **Iteración D:** completar contenido MVP y gates de QA. **Iteración E:** decidir expansión/persistencia/hosting con ADRs. Cada iteración entrega incremento revisable y no comienza con dependencias curriculares/privacidad críticas sin resolver.

## Definition of Ready (DoR)

Problema/actor y alcance claros; criterio verificable; diseño pedagógico y referencia curricular si corresponde; privacidad/licencia/accesibilidad consideradas; dependencias y estados definidos; criterios de aceptación y plan de pruebas; documentación afectada identificada. Bloquear contenido oficial sin provenance aprobada.

## Definition of Done (DoD)

Criterios aceptados satisfechos; implementación revisada; lint/build y pruebas relevantes ejecutados con resultado registrado; accesibilidad y seguridad evaluadas; cambios de Prisma con migración reproducible; docs/enlaces actualizados; rutas de error verificadas; handoff completo. Para contenido: versión, respuesta esperada, feedback, licencia, revisión curricular si se declara alineación y prueba de lectura. Para documentación-only: revisar estructura, enlaces y afirmaciones, sin atribuir pruebas de código. No declarar mapeo curricular listo si falta revisión obligatoria.
