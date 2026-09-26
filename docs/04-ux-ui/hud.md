# HUD, progreso y feedback

## Principio

La pantalla presenta la tarea que el estudiante puede resolver ahora; evita saturación, presión competitiva y señales de dominio que el prototipo no puede justificar.

## Elementos candidatos

- objetivo/paso actual en lenguaje concreto;
- ubicación narrativa y alternativa textual al mapa;
- controles persistentes de ayuda, pausa y regreso a la fuente/instrucción;
- estado de carga, error, intento y feedback anunciado de forma accesible;
- indicador de misión solo si describe una etapa narrativa, sin sugerir “avance curricular”.

XP puede omitirse. Si se incorpora, su etiqueta y presentación deben indicar que es recompensa de juego; no usar barra de aprendizaje, porcentaje de dominio, ranking, racha competitiva ni comparación entre personas.

## Reglas de interacción

Mantener foco predecible al abrir/cerrar paneles; anunciar actualizaciones no intrusivas a lectores; respetar zoom, texto ampliado y preferencias de movimiento/audio. No depender de color, sonido, animación, precisión fina ni tiempo. Evitar bloquear el mapa tras un error; ofrecer lista equivalente de puntos/rutas.

## Estado implementado

`apps/frontend/src/componentes/juego/HudMision.tsx` es una barra persistente con el objetivo actual en lenguaje concreto, la etapa narrativa ("etapa N de M de la historia", sin sugerir avance curricular), la zona, y controles siempre visibles de pista, esquema, instrucciones y pausa. El XP aparece rotulado como puntos de juego con la aclaración de que no es una nota, y solo cuando hay alguno. El feedback toma el foco al aparecer y los cambios de pantalla se anuncian por `RegionAnuncios`.

## Validación y estado

Verificar comprensión del objetivo, ayuda/pausa, efecto de feedback y distinción de XP mediante tareas observables. Eso no se ha hecho: el HUD está construido pero no probado con estudiantes ni con tecnologías de asistencia.
