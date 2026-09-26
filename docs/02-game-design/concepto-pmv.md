# Concepto de juego para el PMV

## Estado

Propuesta de diseño para iniciar prototipado. No está implementada, probada con estudiantes ni aprobada como alineación curricular. La audiencia, las áreas y la ubicación se basan en las decisiones del equipo del 26-09-2026.

**Decisiones confirmadas por el equipo:** el primer corte tiene una misión integrada, cinco variantes (una por grado) y dos retos conectados —fuentes históricas y recorrido matemático—. Se comenzará con un mapa esquemático. Estos acuerdos fijan la estructura, pero no aprueban contenido curricular, hechos históricos ni la cartografía real.

## Alcance confirmado

- **Público:** estudiantes de 1.º a 5.º de Secundaria.
- **Áreas prioritarias:** Ciencias Sociales (historia de Huancayo) y Matemática.
- **Lugar:** mundo ilustrado con ancla en Plaza Constitución, Huancayo, Junín; cada punto jugable estará a no más de cuatro manzanas recorridas desde la plaza.
- **Formato:** videojuego web interactivo, accesible con teclado y controles táctiles.
- **Colaboración de agentes:** Codex y Claude trabajan sobre estas mismas reglas y documentos; ningún agente aprueba por sí solo currículo, historia o representación local.
- **Arte:** se pueden crear recursos con ChatGPT y aplicaciones externas; se deben registrar, revisar y atribuir según [arte y recursos](arte-recursos.md).

## Primer corte confirmado; contenido por validar

Implementar **una misión integrada** con cinco variantes (una por grado), un mapa esquemático inicial y dos tipos de reto:

1. **Indagación histórica:** ayudar a preparar una pequeña muestra/recorrido sobre Huancayo. El jugador lee tarjetas de fuentes con autoría, fecha y contexto; ordena información o distingue qué afirmación está respaldada y cuál sigue en duda.
2. **Recorrido matemático:** ubicar puntos del mapa y seleccionar un trayecto que cumpla una condición. El reto usa relaciones espaciales y distancias; el uso de escala formal depende de la adaptación por grado y la revisión pedagógica.

La estructura narrativa termina cuando el estudiante justifica su selección usando la evidencia mostrada y puede corregir su respuesta después de una pista. El guion específico sigue pendiente. Los documentos presentados como fuentes deben ser reales, atribuidos y fieles; no fabricar citas ni documentos de época. Gemini se usará para preparar borradores y para producir pistas/diálogo acotado; el jugador solo elegirá opciones, sin texto libre. El modelo no decidirá corrección, puntaje ni aprendizaje y se aplican los gates de [ADR 0003](../05-arquitectura/adrs/0003-proveedores-ia-y-activos-generados.md).

## Variantes por grado

Cada variante debe conservar la misma historia central y diferenciar cantidad/longitud de fuentes, complejidad del mapa, pasos de razonamiento, vocabulario y ayudas. La siguiente tabla es una pauta editorial interna; no afirma desempeños del CNEB:

| Grado | Diferenciación interna propuesta | Revisión requerida |
| --- | --- | --- |
| 1.º | Fuentes breves con apoyos visibles; ubicar y ordenar un recorrido simple. | Docente/especialista confirma lectura, evidencia y demanda. |
| 2.º | Contrastar dos tarjetas y comparar recorridos por número de manzanas. | Validar incremento frente a 1.º y correspondencia curricular. |
| 3.º | Revisar contexto de fuentes y justificar un trayecto con más de una condición. | Revisión del ciclo VII y criterios de justificación. |
| 4.º | Contrastar perspectivas y comparar distancias/alternativas del mapa. | Especialista valida fuentes, modelo y dificultad. |
| 5.º | Explicar límites de la evidencia histórica y argumentar una ruta con representación espacial adecuada. | Validar pertinencia histórica para 5.º y referencia curricular exacta. |

No publicar versiones por grado ni afirmar alineación hasta que la revisión por especialistas verifique la precisión y la carga de cada reto. La progresión anterior sirve para diseñar preguntas de prototipo, no para sustituir desempeños oficiales.

## Loop de juego y criterios verificables

`Inicio sin cuenta → selección temporal del grado → mapa esquemático → interacción con personaje/fuente → reto histórico → reto de ruta → feedback/pista/reintento → cierre y salida`.

El prototipo cumple el alcance funcional recomendado cuando:

- permite iniciar y terminar una sesión sin nombre, correo, escuela, ubicación, imagen o voz del estudiante;
- muestra el grado elegido solo en memoria de sesión y ofrece las cinco variantes;
- cada punto de interés está documentado a una distancia de hasta cuatro manzanas de Plaza Constitución, según el plano de referencia aprobado;
- tiene una interacción histórica basada en fuentes trazables y una interacción matemática de ubicación/recorrido;
- informa por qué una opción tiene evidencia o qué dato falta, y permite ayuda, pausa y reintento;
- funciona con teclado y táctil, ofrece texto alternativo y no depende únicamente de color, sonido, animación o velocidad;
- no usa XP como calificación o indicador de aprendizaje, y no guarda datos al cerrar/recargar.

## Pendientes antes de cerrar contenido

1. Cotejar una fuente primaria o archivo fiable para cada hecho, fecha y localización histórica; contrastarla con MINCETUR y fuentes locales.
2. Elaborar una matriz por grado y área: objetivo interno, referencia exacta de fuente curricular, respuesta observable, retroalimentación y revisión especialista.
3. Aprobar el polígono cartográfico de cuatro manzanas y verificar la representación con una persona conocedora de la zona.
4. Confirmar formato de prueba, dispositivos, autorizaciones y salvaguardas antes de probar con menores.
5. Aprobar el nombre del juego, guion y criterio de éxito; especificar el contrato y límites de pistas/diálogo de Gemini antes de conectar llamadas reales con el juego.

### Nota de fuente histórica

La ficha de MINCETUR sobre la Plaza Constitución contiene relatos sobre la jura de la Constitución de Cádiz y la abolición de la esclavitud, pero presenta años distintos para la abolición entre la descripción y las observaciones. Son candidatos de investigación, no respuestas correctas listas para el juego. Registrar la discrepancia en [referencias](../09-referencias/README.md) y resolverla con fuentes históricas primarias y revisión local.
