# Estados y eventos

## Estados implementados

La pantalla técnica expone la conexión a API y DB mediante `/api/health`; esos estados no son estados de misión. No existe gestor del flujo de juego, bus de eventos ni analítica.

## Máquinas de estado propuestas

**Carga de contenido:** `idle → loading → ready | empty | error`; reintento vuelve a `loading`. No enviar contenido marcado borrador o pendiente de validación.

**Misión en memoria:** `not_started → active → completed` o `abandoned`; pausa es una condición reversible de `active`. Salir/recargar reinicia en el prototipo sin persistencia. Completar misión solo describe progreso narrativo.

**Reto:** `not_started → presenting → awaiting_response → feedback → retry | next | closed`. Ayudas pueden consultarse antes/después de intento. El error no bloquea rutas ni acceso a práctica.

**Estado editorial:** `draft → pedagogical_review / curricular_review / local_review → approved → published → retired`. Las revisiones pueden devolver el material a borrador; `approved` exige todas las revisiones que correspondan al tipo de afirmación. Ningún workflow está automatizado hoy.

## Eventos y telemetría

Eventos como `mission_opened`, `challenge_started`, `hint_opened` o `challenge_completed` solo se considerarían con propósito y necesidad aprobados. Por defecto no registrar usuario, grado persistente, texto libre, coordenadas, identificadores, IP como analítica, voz, imagen ni información escolar. Revisar logs de infraestructura por separado para evitar que capturen payloads.

Antes de instrumentar: definir evento/propósito, campos, granularidad, responsable, acceso, retención, eliminación, información y salvaguardas; revisar posibilidad de reidentificación. Evento técnico necesario para fiabilidad no se reutiliza automáticamente como analítica educativa.
