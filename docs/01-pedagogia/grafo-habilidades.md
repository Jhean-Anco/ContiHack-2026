# Grafo de habilidades

## Alcance del modelo

El grafo, si se implementa, representa relaciones de diseño entre objetivos internos y retos. No reproduce el mapa de competencias del CNEB ni diagnostica al estudiante. Mantener nodos y aristas independientes de premios XP y de los elementos curriculares oficiales.

## Esquema de nodo y arista

Nodo propuesto: `id`, `label`, `description`, `observableEvidence`, `challengeRefs`, `suggestedGrades`, `supports`, `sourceRefs`, `status`, `reviewer`, `reviewedAt`, `version`. El grado sugerido expresa el diseño del reto, no un desempeño oficial.

Arista: `from`, `to`, `type` (`prerequisite`, `supports`, `transferTo`), `rationale`, `evidence`, `review`. Una relación `prerequisite` debe tener justificación y ruta alternativa; evitar que un único error cierre el acceso a la práctica.

## Reglas de calidad

- Usar verbos que describen acciones observables y contexto; evitar etiquetas vagas como “sabe historia”.
- No copiar nombre de competencia/capacidad oficial como si fuera habilidad del juego. Un vínculo curricular vive en un [mapeo versionado](modelo-curricular.md).
- No crear aristas por similitud de palabras o solo porque dos retos comparten tema.
- Detectar ciclos de prerrequisitos; documentar y resolverlos antes de publicación.
- Permitir apoyos y reintentos sin exigir “desbloquear” una habilidad.
- Revisar el grafo con docentes, y comprobar las rutas con uso accesible y variantes por grado.

## Ejemplo abstracto no curricular

`comparar_dos_rutas` podría depender de que el mapa y la leyenda sean comprensibles. Este ejemplo no afirma que una competencia oficial requiera esa habilidad ni que corresponda a un grado concreto.

## Estado actual

El grafo es una propuesta conceptual sin nodos aprobados, datos persistidos ni motor de recomendación implementado. Crear instancias solo después de definir retos y criterios observables.
