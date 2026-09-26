# Sistemas de juego

## Jugador

Avatar no realista con opciones inclusivas; no exigir nombre real, fecha de nacimiento o género para probar el prototipo. En el primer vertical slice acordado no hay cuenta ni persistencia: estado temporal de misión en React y reinicio al recargar/salir. No guardar progreso en PostgreSQL hasta aprobar identidad, minimización y política de retención. Estado de sesión independiente de evidencia pedagógica.

## NPC y diálogos

Cada NPC tiene función narrativa clara, forma de hablar revisada por grado/contexto, límites de seguridad y contenido versionado. No usar chat abierto ni pedir al estudiante trasladarse a otros canales. Localización y nombres requieren validación cultural.

## Misiones y retos

Misión: `id`, premisa, objetivo interno, zona, NPC, prerequisitos narrativos, retos y cierre. Reto: `id`, grado objetivo (1.º–5.º), instrucción, interacción, respuestas, evidencia esperada, ayudas, feedback por caso, mapeos curriculares con provenance, accesibilidad, versión y revisiones. El primer corte acordado contiene una misión con cinco variantes por grado y retos integrados de análisis histórico local y razonamiento espacial. Todo esto es esquema conceptual; no existe todavía en base de datos.

## XP y desbloqueos

Asignar XP por hitos de juego claramente anunciados (exploración, completar una etapa, probar alternativa), evitando recompensa por velocidad o intentos ilimitados. XP solo sirve para cosmética/narrativa opcional. Desbloqueos siguen avance narrativo o elecciones inclusivas, no estimaciones de capacidad; conservar acceso a práctica y ayudas.

## Reglas generales

Sin penalización por pausa, salida o reintento. Sin cronómetro competitivo, ranking, chat, compras ni mensajes que generen culpa o urgencia. Explicar controles, objetivos y estados. Como el prototipo no persiste, indicar que salir reinicia la misión antes de abandonar. No presentar la demo como herramienta para nota, diagnóstico o seguimiento individual. Especificaciones de interacción se validan con prototipo.
