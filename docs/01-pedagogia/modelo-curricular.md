# Modelo curricular

Modelo de datos conceptual, no implementado: `FuenteCurricular` → `ElementoCurricularVerificado` → `MapeoReto`. El elemento oficial conserva literal, localizador y versión. El mapeo declara tipo y grado de relación, justificación, especialista revisor y evidencia que puede observarse en el reto. Un reto puede tener múltiples mapeos o ninguno; no forzar correspondencias.

Grados y ciclos se almacenan según la fuente consultada, sin derivar automáticamente desempeños. Separar áreas oficiales de etiquetas temáticas internas. Mantener registros históricos para identificar qué versión curricular informó una misión.

## Campos mínimos

- Fuente: `sourceId`, título, entidad emisora, norma, edición, URL, fecha de consulta y versión/archivo identificado.
- Elemento: tipo oficial, nombre literal, `locator` (página/sección), texto cotejado o paráfrasis marcada, fecha de vigencia conocida y estado de validación.
- Mapeo: `challengeId`, grado, objetivo interno, evidencia observable, relación propuesta, justificación, especialista, fecha y decisión.

Estados: `pendiente_validacion`, `verificado_documentalmente`, `revision_especialista`, `aprobado_para_uso`, `retirado`. “Verificado documentalmente” significa que se cotejó con la fuente, no que un especialista aceptó su interpretación para el reto. El PMV no tiene mapeos aprobados actualmente.
