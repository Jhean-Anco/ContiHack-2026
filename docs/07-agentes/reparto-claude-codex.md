# Reparto de trabajo Claude / Codex (primer vertical slice)

Acuerdo operativo del 26-09-2026 para el corte confirmado en [ADR 0002](../05-arquitectura/adrs/0002-vertical-slice.md). No amplía alcance, no aprueba contenido y no declara nada implementado más allá de lo que el repositorio contenga. Rige sobre él [`AGENTS.md`](../../AGENTS.md).

## Criterio del corte

Claude construye **la capa visible y su interacción**; Codex construye **la lógica del sistema y la autoridad de contenido/reglas**. La frontera es el contrato HTTP descrito en [API](../05-arquitectura/api.md): el frontend es consumidor, nunca autoridad.

## Propiedad de archivos

| Zona | Responsable | Revisor |
|---|---|---|
| `apps/frontend/src/**` | Claude | Codex |
| `apps/backend/src/**`, `apps/backend/prisma/**` | Codex | Claude |
| `docs/04-ux-ui/**` | Claude | Codex |
| `docs/03-contenido/**`, `docs/05-arquitectura/api.md`, `docs/05-arquitectura/backend-bd.md` | Codex | Claude |
| `compose.yaml`, `package.json` raíz, `docs/0[1259]-*`, ADRs | quien abra la tarea, avisando en el handoff | el otro agente |

Excepción única en sentido inverso: `apps/frontend/src/servicios/contratos.ts` describe el transporte y **Codex puede corregirlo** cuando el contrato real difiera; en ese caso lo anota en el handoff para que Claude ajuste el render.

## Alcance de Claude (visual y funcionalidad de interfaz)

- Tokens de color/tipografía/espaciado/movimiento, tema claro y oscuro, foco visible, contraste.
- Componentes base y de juego: botón, diálogo, aviso, tarjeta de fuente, panel de mapa esquemático, lista equivalente de puntos, opciones de reto, pista, feedback, HUD, pausa, cierre.
- Pantallas y navegación del flujo documentado en [flujos y pantallas](../04-ux-ui/flujos-pantallas.md), incluidos estados de carga, vacío y error.
- Accesibilidad de la interfaz: teclado, orden y visibilidad del foco, nombres accesibles, región de anuncios, ampliación, objetivos táctiles, `prefers-reduced-motion`.
- Estado **de presentación** en memoria: qué pantalla se ve, qué panel está abierto, qué opción marcó la persona, si hay una petición en curso.

## Alcance de Codex (lógica del sistema)

- Catálogo sintético de contenido en `apps/backend/src/content/` con versión, IDs estables y estado editorial.
- Endpoints REST ya implementados: `GET /api/content/manifest`, `GET /api/content/missions/:id?grade=`, `POST /api/game/answer` y `POST /api/game/assistance`; validación de selección y códigos de error. Rate limiting de infraestructura queda pendiente.
- **Autoridad de corrección**: qué respuesta tiene evidencia, qué feedback corresponde, qué pista se entrega, qué cuenta como cierre narrativo. El cliente solo muestra lo que el servidor decide.
- Reglas de variante por grado, evaluación determinista, opciones cerradas y adaptador Gemini con ledger acumulado/fallback mock. El proveedor real continúa apagado por defecto; revisar [ADR 0003](../05-arquitectura/adrs/0003-proveedores-ia-y-activos-generados.md) antes de activarlo.
- Pruebas de reglas, contenido y contrato en el backend.

## Frontera explícita

El frontend **no** evalúa respuestas, no calcula XP, no decide feedback, no interpreta mapeos curriculares y no persiste nada. Si una pantalla necesita un veredicto, lo pide al servidor. Mientras el endpoint no exista, el cliente usa el adaptador provisional descrito abajo y lo rotula en pantalla.

## Adaptador provisional y su retiro

`apps/frontend/src/servicios/datosProvisionales.ts` contiene datos **ficticios y rotulados** para poder construir y probar la interfaz sin backend de contenido, según autoriza [preparación del PMV](../06-implementacion/preparacion-pmv.md). Compose elige HTTP; los datos provisionales siguen disponibles para ejecución local sin API. Condiciones:

1. Ningún dato histórico, curricular o cartográfico de ese archivo se presenta como real; la interfaz muestra un aviso permanente de contenido de ejemplo.
2. El veredicto que devuelve es de andamiaje de interfaz, no una clave de respuesta aprobada.
3. Compose configura `NEXT_PUBLIC_CONTENIDO_ORIGEN=http`; `clienteContenido.ts` usa el cliente HTTP y transforma/valida el payload del slice para el modelo consumido por la máquina de flujo. No mezclar ambos resultados ni ocultar el aviso de contenido ficticio.

## Coordinación por tarea

Antes de editar, cada agente actualiza su lectura del estado Git y declara en el handoff alcance, archivos previstos y revisor. No se editan a la vez los archivos de la otra columna. Los conflictos se reportan antes de resolverlos. Este reparto entre agentes no sustituye revisión docente, curricular, histórica, cultural ni de privacidad.

## Handoff Codex → Claude (26-09-2026)

**TASK:** Implementar la lógica del primer slice para una misión, cinco grados, fichas históricas ficticias y reto de rutas esquemáticas; conectar los contratos para la futura interfaz.

**ANALYSIS/decisiones:** Se conservó `useFlujoMision` como flujo compartido. El backend es autoridad para responder; la IA solo orienta. Las rutas de ejemplo usan como máximo cuatro tramos y no representan calles reales. No se almacenan respuestas ni progreso del jugador. Gemini permanece mock salvo configuración deliberada.

**CAMBIOS:** Catálogo, evaluación y asistencia en `apps/backend/src/content/`; migration y ledger en `apps/backend/prisma/`; cliente tipado en `apps/frontend/src/features/game/game-api.ts`; adaptación y validación al modelo de interfaz en `apps/frontend/src/servicios/clienteContenido.ts`; Compose usa el modo HTTP. Se actualizó contrato API, estado PMV, frontend y este reparto. El trabajo visual preexistente de Claude en `/`, `/jugar` y componentes se preservó.

**VERIFICACIÓN:** Frontend: build, lint completo y `npm run prueba:humo` pasaron; la prueba de humo cubre el flujo provisional, no HTTP. Backend: build, lint y `prisma validate` pasaron. Falta levantar el stack y comprobar las rutas Nest con HTTP real.

**PENDIENTES:** Levantar Compose y comprobar misión, respuestas correctas/incorrectas, asistencia mock, validación inválida y health por HTTP; revisar integración visual. Historia local y objetivos por grado requieren fuentes y revisión docente/local.

**RIESGOS/ADR/provenance:** Gemini usa `gemini-3.1-flash-lite`, `store:false`, reserva y ledger local de USD 5; autoría externa se contabiliza manualmente. No reutilizar la clave pegada en chat: tratarla como expuesta y rotarla. El contenido del juego sigue `synthetic-demo`.

**ESTADO Git:** Cambios locales sin commit ni push; conservar los cambios existentes de README, CSS, docs y otros archivos del usuario.
