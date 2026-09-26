# Preparación para iniciar el PMV

Revisión de implementación del 26-09-2026. Este documento separa el slice lógico ejecutable de los contenidos que siguen pendientes de aprobación pedagógica e histórica.

## Estado por frente

| Frente | Estado | Evidencia / límite |
|---|---|---|
| Audiencia | Confirmada | 1.º a 5.º de secundaria. |
| Áreas | Confirmadas | Ciencias Sociales (historia de Huancayo) y Matemática. Objetivos curriculares por grado pendientes de cotejo docente. |
| Zona | Ancla confirmada; mapa esquemático | Plaza Constitución, Huancayo. El mapa actual solo es un ejercicio abstracto y no representa calles o distancias reales. |
| Slice | Lógica inicial implementada | Una misión, cinco variantes y dos retos: contraste cronológico de fichas sintéticas y comparación de recorridos. |
| Backend | Lógica implementada | Catálogo, selección por grado, validación de opciones y evaluación determinista en Nest. No guarda progreso. |
| Gemini | Fallback listo; proveedor real cerrado por defecto | `AI_PROVIDER=mock`. Interactions API, ledger de USD 5, `store:false` y salida acotada implementados. Para habilitarlo se necesita clave nueva rotada, configuración local segura y autorización de privacidad/proveedor. La clave compartida en chat se considera expuesta. |
| Frontend | Interfaz y flujo de juego presentes | Rutas `/`, `/jugar`, `/salud`, máquina de navegación y cliente conectado por contrato. El build pasa; falta levantar API y comprobar la partida integrada. |
| PostgreSQL | Ledger IA preparado | Migración `add_ai_budget_ledger`; requiere correr `prisma migrate deploy` antes de llamadas reales. El ledger aplica a llamadas que pasan por el backend; autoría con herramientas externas se resta manualmente del total de USD 5. |
| Arte | Flujo definido | Claude trabaja la capa visual; ChatGPT se usará fuera de línea para crear imágenes cuando se necesiten. Registrar prompt, procedencia, condiciones y revisión de cada activo. |
| Datos históricos | Pendiente | Las fichas de juego son inventadas y rotuladas como demostración; no presentar como hechos de Huancayo. |
| Currículo | Pendiente | Revisar CNEB/programa por grado, edición, norma y localizador con docente/especialista. |
| Prueba con menores | No autorizada por esta implementación | Requiere protocolo, autorizaciones, consentimiento y salvaguardas correspondientes. |

## Rutas implementadas

Consultar [contratos API](../05-arquitectura/api.md): `GET /api/content/manifest`, `GET /api/content/missions/:id?grade=1..5`, `POST /api/game/answer` y `POST /api/game/assistance`.

## Siguiente secuencia de desarrollo

1. Ejecutar migraciones y levantar Postgres, backend y frontend con Compose.
2. Verificar HTTP real para misión, respuesta correcta/incorrecta, ayuda mock, validación inválida y health.
3. Claude continúa la revisión visual y de accesibilidad del flujo conectado, sin cambiar las reglas del servidor.
4. Obtener revisión curricular e histórica y sustituir las fichas sintéticas por contenido con procedencia aprobada.
5. Solo tras revisar privacidad y rotar la clave, habilitar Gemini paid tier en servidor y comprobar ledger antes/después de una llamada.

## Criterio de preparación

El desarrollo lógico del slice puede continuar con el modo mock y los contenidos ficticios. El PMV todavía no está listo para mostrar historia local como verdadera, declarar alineación curricular, usar Gemini real, probar con estudiantes ni llamarse validado integralmente hasta ejecutar la secuencia y cerrar sus revisiones.
