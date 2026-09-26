# Flujos y pantallas

## Flujo implementado

`portada → entrada/privacidad → selección temporal de grado → instrucciones/controles → esquema de la zona → contexto y fichas → reto de fuentes → feedback/pista/reintento → reto de ruta → feedback → cierre → salida`.

Existe en `apps/frontend/src/`: la navegación la decide `flujo/maquinaUI.ts`, las peticiones las hace `flujo/useFlujoMision.ts` y las pantallas viven en `pantallas/`. El estudiante puede pedir ayuda, volver a instrucciones o al esquema, pausar y salir sin castigo desde el HUD, en cualquier punto de la misión. La selección de grado solo elige la variante de la sesión: no verifica identidad y no se guarda al cerrar o recargar.

Lo implementado es una interfaz con contenido de ejemplo rotulado. No está probada con estudiantes, no está auditada con tecnologías de asistencia y su contenido no tiene validación curricular, histórica ni local.

## Rutas y pantallas

| Ruta o estado | Propósito | Estado |
|---|---|---|
| `/` | Portada: qué es el proyecto, qué no pide y qué no mide. | Implementada. |
| `/jugar` → entrada | Explicar propósito, sesión temporal y controles antes de empezar. | Implementada. |
| `/jugar` → grado | Elegir variante; se puede cambiar antes de iniciar. | Implementada. |
| `/jugar` → instrucciones | Objetivo, pasos y controles de teclado y táctiles. | Implementada, también como panel reabrible desde el HUD. |
| `/jugar` → mapa | Esquema de la zona con lista equivalente de puntos. | Implementada; el esquema no es cartografía. |
| `/jugar` → contexto | Diálogo de guías y fichas con su procedencia. | Implementada. |
| `/jugar` → reto | Una tarea por pantalla, con fichas o esquema a la vista. | Implementada para los dos tipos de reto. |
| `/jugar` → feedback | Explicación, criterio y siguiente oportunidad; toma el foco. | Implementada; el veredicto viene del servidor. |
| `/jugar` → pausa/ayuda | Pausa sin penalización y pista con su origen. | Implementadas como diálogos modales. |
| `/jugar` → cierre | Resumen narrativo sin calificación, con nota sobre XP. | Implementada. |
| `/jugar` → carga, vacío y error | Informar de fallos de red, catálogo sin misión publicada y errores de contenido, sin detalle técnico. | Implementados, con reintento, cambio de grado y salida. |
| `/salud` | Página técnica del scaffold: salud de API y base de datos. | Conservada, movida desde la raíz. |

## Casos transversales

Cubiertos en código: primera visita, recarga como reinicio explícito, pérdida de API y error de contenido con reintento, respuesta sin opción marcada, foco al cambiar de pantalla y al abrir o cerrar un diálogo, cierre con Escape, salto al contenido principal, `prefers-reduced-motion` y `prefers-color-scheme`.

Pendientes: prueba real con lector de pantalla y con teclado en varios navegadores, ampliación al 200 % y viewport estrecho verificados sobre la página, conexión lenta, y contenido inexistente o no publicable cuando el catálogo real lo distinga. No hay contenido offline.

## Evidencia y estado

Verificación registrada del flujo, el 26-09-2026 y toda en verde:

- `npm run tipos`, `npm run lint`, `npm run build` y `npm run prueba:humo` en `apps/frontend`. La prueba de humo recorre entrada → cierre con intento fallido, pista y reintento, y comprueba las cinco variantes y el rechazo de contenido mal formado.
- Stack completo levantado con `docker compose up -d --build`: PostgreSQL, API Nest y Next respondiendo; `/`, `/jugar` y `/salud` devuelven 200.
- Contrato real comprobado contra el backend en ejecución: manifiesto y misión de los cinco grados pasan los validadores de la interfaz, el servidor distingue veredicto con evidencia de evidencia insuficiente en los dos retos, la pista llega con su origen declarado y un grado fuera de rango produce un mensaje apto para pantalla, sin detalle técnico.

Lo anterior verifica transporte, tipos y navegación. No cubre render en navegador, teclado, lector de pantalla, contraste medido ni ampliación, y no hay prototipos probados con estudiantes ni auditoría de accesibilidad.
