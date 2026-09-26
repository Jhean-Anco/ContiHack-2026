# Agentes y colaboración

La fuente normativa de trabajo es el [`AGENTS.md`](../../AGENTS.md) en la raíz. Claude sigue las mismas reglas vía [`CLAUDE.md`](../../CLAUDE.md); no mantener arquitecturas o instrucciones paralelas. Leer índice y documentos pertinentes de `/docs` antes de cambiar producto, currículo, API o datos.

## Responsabilidades

Agente implementador: inspecciona repo, plantea análisis rastreable, ejecuta cambio acotado, corre verificaciones relevantes y actualiza docs. Claude y Codex pueden asumir tareas distintas o revisar mutuamente; ninguna herramienta tiene autoridad curricular. Aprobación humana/especialista requerida para alcance, mapeos oficiales, decisiones de privacidad y aceptación pedagógica.

## Coordinación Codex + Claude

Ambos agentes comparten repositorio, `AGENTS.md` y `/docs`; antes de editar deben actualizar su lectura del estado Git para no sobrescribir cambios recientes. Al empezar una tarea, registrar alcance, archivos previstos y responsable/revisor en el handoff o en el issue de trabajo. Evitar que ambos editen simultáneamente el mismo archivo; el revisor comprueba diff, enlaces, decisiones y evidencia, y comunica conflictos antes de resolverlos. Los cambios deben quedar en commits revisables del mismo repositorio. La colaboración de agentes no sustituye revisión de docentes/especialistas ni autorización para pruebas con menores. El reparto vigente de archivos y responsabilidades del primer vertical slice está en [reparto Claude/Codex](reparto-claude-codex.md).

## Protocolo TASK → ANALYSIS → IMPLEMENTATION → TEST → DOCUMENTATION → HANDOFF

1. TASK: repetir objetivo, límites y aceptación.
2. ANALYSIS: revisar `/docs`, código y estado Git; identificar riesgos, decisiones/ADR y archivos afectados.
3. IMPLEMENTATION: cambio mínimo coherente, preservar datos y documentación existente.
4. TEST: ejecutar pruebas/lint/build pertinentes; reportar comando y resultado. Si no aplica, explicar.
5. DOCUMENTATION: actualizar guía, contratos, provenance/changelog/ADR impactados.
6. HANDOFF: resumen de cambio, archivos, evidencia, pendientes y estado Git.

## Plantilla de handoff

```text
TASK:
ANALYSIS/decisiones:
CAMBIOS (archivos):
VERIFICACIÓN (comandos y resultados):
DOCUMENTACIÓN actualizada:
PENDIENTES/bloqueos:
RIESGOS/ADR/provenance:
ESTADO Git:
```

## Control de cambios

No ampliar audiencia, propósito, persistencia, analítica ni áreas sin ADR y revisión pertinente. No borrar guías útiles; integrar y enlazar. Si instrucciones o documentación divergen, detener supuestos, reportar conflicto y corregir una fuente única antes de seguir.
