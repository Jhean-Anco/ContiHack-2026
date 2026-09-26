# Calidad, validación y riesgo

## Estado de calidad actual

El primer slice de interfaz/API está implementado. Backend cuenta con `npm test` usando el runner nativo de Node, más `lint` y `build`; frontend tiene `lint` y `build`. No hay pruebas automatizadas de jugabilidad o pedagogía. La ruta `/salud` consulta API/DB, pero no prueba por sí sola el recorrido de juego. Registrar lint/build, pruebas unitarias y verificación HTTP real como comprobaciones distintas.

El primer slice de interfaz y API está implementado, pero no incluye suite de pruebas ni script `test` en los manifiestos. Sí hay scripts `lint` y `build` independientes; backend incluye `@nestjs/testing` pero no aparece runner configurado. No hay pruebas automatizadas de jugabilidad o pedagogía. La ruta `/salud` consulta API/DB; no prueba por sí sola la experiencia de juego. Registrar lint/build y verificación HTTP real como comprobaciones distintas.

## Testing

Backend: `npm run lint` y `npm test` en `apps/backend`; frontend: `npm run lint` y `npm run build` en `apps/frontend`. `npm test` genera Prisma y ejecuta pruebas deterministas con datos sintéticos; no contacta Gemini. Extender luego a prueba navegable, teclado/lector/zoom, error/offline y regresión de provenance. Cada objetivo requiere revisión pedagógica y evidencia observable; XP no cuenta como indicador. No usar datos personales reales de estudiantes para automatizar pruebas.

Ejecutar backend `npm run lint` y `npm test` en `apps/backend`; frontend `npm run lint` y `npm run build` en `apps/frontend`. `npm test` genera Prisma y ejecuta pruebas deterministas con datos sintéticos, sin contactar Gemini. Extender la verificación a prueba navegable, teclado/lector/zoom, error/offline y regresión de provenance. Cada objetivo requiere revisión pedagógica y evidencia observable; XP no cuenta como indicador. No usar datos personales reales de estudiantes para automatizar pruebas.

## Pruebas de jugabilidad

Observar si estudiante entiende objetivo/instrucción, sabe iniciar/pausar/retomar, interpreta feedback, puede corregir estrategia y recuperarse de error. El alcance declarado incluye 1.º–5.º: revisar prototipos con representación de ambos ciclos (VI: 1.º–2.º; VII: 3.º–5.º) y no extrapolar hallazgos de un grado a los demás. Definir protocolo, autorizaciones, consentimiento y protección antes de reclutar menores. Evitar grabaciones y recopilar solo observaciones necesarias y desidentificadas.

## Pruebas pedagógicas

Especialista verifica referencia y relación reto-evidencia; revisión de distractores, alternativas, accesibilidad y sesgo; probar respuestas y feedback; analizar si el acierto mide la intención y no lectura, tiempo o familiaridad externa. XP se excluye como indicador. No inferir eficacia causal con pruebas informales.

## Privacidad de menores y analítica

Por defecto evitar analítica de usuario y persistencia identificable. Antes de activarla: propósito, necesidad, variables mínimas, responsable, acceso, retención, borrado, protección, transparencia/consentimiento y revisión legal aplicable. No recolectar nombre, escuela, ubicación precisa, fecha de nacimiento, imagen, voz ni texto libre por conveniencia. Evitar publicidad, perfiles, rankings y compartir datos. Analítica agregada aún exige evaluar reidentificación y utilidad. Ningún envío real está configurado hoy.

## Deployment

Único entorno definido es local con Compose: PostgreSQL 17, NestJS API en host `3001`, Next dev server en `3000`. No hay hosting/producción definidos. Para despliegue futuro, ADR de proveedor/región, secretos, HTTPS, backups, migraciones, monitorización sin PII, actualización y respuesta a incidentes; ambientes y permisos separados. No afirmar que deployment está listo.

## Criterios de aceptación del PMV

| Dimensión | Criterio de salida |
|---|---|
| Alcance | Toda la experiencia está dirigida a 1.º–5.º de Secundaria, con Ciencias Sociales y Matemática; no incluye Inicial ni Primaria. |
| Técnica | En Compose los servicios levantan; health check API y conexión DB responden; frontend carga contenido vía API; se registran resultados de lint/build de ambas apps. |
| Contenido | Una misión acordada tiene variantes para los cinco grados y retos de historia/recorrido con instrucciones, respuestas, feedback, pistas, accesibilidad y versión; ningún dato local sale sin fuente/revisión. |
| Currículo | Cada afirmación de mapeo incluida tiene fuente oficial, edición/norma, página/sección y aprobación especializada; si falta, se etiqueta como objetivo interno sin alineación oficial. |
| Juego | Participante puede comenzar, pausar, reintentar, recibir feedback, terminar y salir; error de API/DB se comunica de forma comprensible; ninguna acción es irreversiblemente punitiva. |
| Accesibilidad | Teclado completo, foco visible, etiquetas semánticas, contraste/zoom verificados, alternativas a color/sonido/movimiento; resolver bloqueantes identificados antes del piloto. |
| Privacidad | Sin cuentas ni persistencia identificable para el piloto; sin chat libre/entre jugadores, publicidad, ranking, envío de imagen, voz o ubicación. Gemini solo responde a opciones cerradas y diálogo/pistas acotadas tras aprobar su contrato y tratamiento de datos; protocolo de prueba con menores aprobado. |
| Evidencia | Resultados de prueba de jugabilidad y revisión curricular/cultural documentados; sin presentar resultados de una prueba pequeña como eficacia causal. |

Estos criterios son propuesta de salida del piloto; el responsable del producto deberá aprobarlos antes de llamar al build “PMV aceptado”.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Error o cambio curricular | Fuente versionada, revisión, changelog y retirada de contenido. |
| XP confundido con aprendizaje | Separación visual/modelo y pruebas de comprensión. |
| Desajuste por grado | Cinco variantes revisadas y pruebas que incluyan estudiantes de ambos ciclos de Secundaria. |
| Representación local imprecisa | Revisión por personas conocedoras, provenance/licencias. |
| Recolección excesiva de datos infantiles | Minimizar; decidir propósito y controles antes de persistir. |
| Exclusión por dispositivo, red o discapacidad | Diseño adaptable, offline/error claros y pruebas accesibles. |
| Alcance inabarcable del nivel | Mantener 1.º–5.º y las dos áreas confirmadas; limitar el primer corte a una misión con cinco variantes y dos retos, con progresión pendiente de validar. |
| Confundir documentación con producto implementado | Reportar estado por separado y evidencia reproducible. |
