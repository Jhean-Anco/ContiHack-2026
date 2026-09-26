# Catálogo propuesto para el PMV

No hay contenido de juego en el código. El catálogo de abajo es un **borrador de propuesta para iniciar el prototipo**, no contenido aprobado, implementado, curricularmente validado ni históricamente exacto. Los elementos locales son ficticios hasta que se documenten fuentes y revisión.

## Alcance confirmado y propuesta de contenido

| Elemento | Propuesta de primer corte | Estado |
|---|---|---|
| Audiencia | 1.º–5.º de Secundaria | Confirmado por el equipo |
| Áreas foco | Ciencias Sociales (historia de Huancayo) + Matemática | Confirmadas por el equipo; objetivos por grado pendientes de mapeo |
| Zona | Área jugable a un máximo de cuatro manzanas recorridas desde Plaza Constitución | Centro confirmado; polígono y calles por validar localmente |
| Misión | Una misión integrada que combine indagación histórica y recorrido espacial | Estructura confirmada para el primer prototipo; guion pendiente |
| Retos | Un reto de fuentes/tiempo histórico y uno de orientación/ruta, con variante por grado | Estructura confirmada; aprendizaje, dificultad y duración por validar |
| NPC y arte | Personajes guía originales | Funciones propuestas; nombres, diálogo y recursos por diseñar y revisar |
| Perfil/guardado | Sin cuenta ni persistencia identificable; reinicio al recargar | Base de privacidad propuesta; requiere confirmación antes de cualquier ampliación |

## Flujo dentro de una misión integrada

1. **Indagar:** explorar y contrastar fuentes atribuidas sobre un hecho local que aún está por seleccionar y validar.
2. **Orientarse:** ubicar puntos y comparar trayectos en un mapa esquemático, con variante por grado pendiente de revisión pedagógica.
3. **Justificar y revisar:** conectar la afirmación con la evidencia y explicar una decisión de ruta, recibir feedback y poder reintentar. Esta es la fase de cierre, no un tercer tipo de reto.

Los dos primeros pasos representan dos tipos de reto dentro de una misión, no tres misiones. Los objetivos son internos de diseño, no competencias ni desempeños oficiales. No usar datos reales de Huancayo sin fuente y revisión. Cada variante para 1.º, 2.º, 3.º, 4.º y 5.º requiere revisión independiente; no basta una única dificultad etiquetada para todos los grados. Véase [concepto PMV](../02-game-design/concepto-pmv.md).

## Funciones narrativas posibles (sin cantidad de personajes decidida)

- **Orientación:** podría presentar misión y controles sin revelar respuesta.
- **Contexto de evidencia:** podría explicar procedencia/límites de una fuente y ofrecer pistas.
- **Cierre/reflexión:** podría facilitar comparación de razones y síntesis.

Son funciones que podrían recaer en uno o más personajes; no se ha decidido su cantidad ni reparto. No hay nombres, edad, biografía o rasgos culturales definidos. La interacción con Gemini se limita a pistas y diálogo acotado; no conversación libre.

Gemini se usará para preparar borradores de contenido y dar pistas/diálogo acotado durante el juego. El jugador elegirá opciones cerradas; no habrá texto libre en la interacción inicial. Hasta que se apruebe el contrato en [ADR 0003](../05-arquitectura/adrs/0003-proveedores-ia-y-activos-generados.md), las respuestas de prototipo pueden ser simuladas. El modelo no define claves de respuesta, puntaje ni feedback curricular.

## Criterio de publicación

Una misión podría pasar a `publicado` solo con guion, criterios de respuesta, feedback y ayudas definidos; revisión de edad y accesibilidad; referencia curricular oficial cotejada o etiqueta explícita “objetivo de juego sin mapeo oficial”; revisión cultural/licencia de activos locales; versión e IDs estables; aprobación pedagógica. La dirección técnica propuesta es servir contenido aprobado desde el API NestJS y no duplicarlo en la UI; hoy ese endpoint y catálogo no están implementados.
