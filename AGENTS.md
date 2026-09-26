# AGENTS.md — ContiHack 2026

Reglas obligatorias para Codex, Claude y cualquier agente o colaborador automatizado.

## Fuente de verdad y lectura previa

1. Antes de planificar o editar, revisar `docs/README.md`, el apartado pertinente y el estado/código real del repositorio.
2. `docs/` es la fuente de verdad de producto/pedagogía/arquitectura; `AGENTS.md` gobierna el flujo de trabajo. `CLAUDE.md` solo remite a estas mismas reglas.
3. Las guías técnicas existentes también son referencia del entorno implementado; no asumir que el objetivo propuesto ya está construido.
4. Si dos documentos divergen, registrar el conflicto y corregirlos; no crear una arquitectura paralela.

## Límites absolutos

- El PMV se limita a estudiantes de 1.º a 5.º de Educación Secundaria del Perú; Inicial y Primaria están fuera. El equipo confirmó Ciencias Sociales (historia de Huancayo) y Matemática como áreas prioritarias, y un mundo interactivo a un máximo de cuatro manzanas desde Plaza Constitución en Huancayo. Los objetivos curriculares específicos por grado, el polígono del mapa y los hechos históricos publicables requieren validación; no presentarlos como aprobados.
- No inventar, inferir ni reconstruir de memoria competencias, capacidades, estándares, desempeños, áreas o datos oficiales del CNEB/Programa Curricular. Verificar fuente primaria, norma, edición y localizador; dejar lo no verificado como `pendiente de validación`.
- XP no equivale a aprendizaje, progreso curricular, calificación o dominio. Mantenerlos separados en modelo, lógica, interfaz y analítica.
- Mantener contenido, provenance y reglas pedagógicas desacoplados de UI.
- No ampliar el alcance confirmado ni añadir persistencia de datos infantiles, analítica, cuentas o servicios externos sin decisión documentada (ADR) y revisión pertinente.
- Preservar cambios de usuario y documentación útil. No leer, mostrar ni versionar secretos de `.env`.
- Una propuesta, un build o una pantalla no son evidencia de jugabilidad, eficacia pedagógica ni aprobación curricular.

## Flujo obligatorio

`TASK → ANALYSIS → IMPLEMENTATION → TEST → DOCUMENTATION → HANDOFF`

1. **TASK:** declarar objetivo, límites y aceptación.
2. **ANALYSIS:** leer docs/código, revisar Git, identificar riesgos, dependencias, archivos y necesidad de ADR/provenance.
3. **IMPLEMENTATION:** cambios acotados, coherentes con stack real y sin destruir material.
4. **TEST:** añadir/ejecutar pruebas relevantes para cambio de código; registrar comando y resultado. No atribuir pruebas no ejecutadas. Para cambios solo documentales, validar enlaces y estructura según la petición.
5. **DOCUMENTATION:** actualizar `/docs`, contratos, ADR, provenance/changelog curricular si corresponde.
6. **HANDOFF:** usar formato de abajo y dejar estado Git claro.

## Definition of Done

- Criterios de aceptación satisfechos y alcance preservado.
- Cambio revisado contra código y stack real; no presenta propuestas como funciones implementadas.
- Pruebas/lint/build relevantes ejecutados cuando corresponda, con evidencia y fallos reportados.
- Validaciones curriculares con fuente y revisión requeridas, o rotuladas explícitamente pendientes y no presentadas como alineación confirmada.
- Documentación/enlaces/ADRs/changelog actualizados.
- Seguridad, privacidad de menores, accesibilidad y errores considerados según el cambio.
- Handoff enumera archivos, decisiones, verificaciones, pendientes, riesgos y estado Git.

## Formato de handoff

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
