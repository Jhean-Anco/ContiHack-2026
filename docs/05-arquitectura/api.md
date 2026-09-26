# Contratos API

Contratos del slice lógico disponible en NestJS. Todas las rutas usan el prefijo `/api`; JSON UTF-8. El servidor es autoridad para validar opciones y respuestas.

## Catálogo de misión

### `GET /api/content/manifest`

Devuelve la misión de muestra y los grados disponibles. El manifiesto y todo el catálogo actual declaran `synthetic-demo`; no contienen historia local aprobada ni mapeos curriculares.

### `GET /api/content/missions/mision-pmv?grade={1..5}`

Entrega la misión esquemática del grado solicitado, las dos fichas ficticias y los retos de fuentes y recorrido. Se acepta solo un grado entero de `1` a `5`; un grado fuera del rango o mal formado produce `400`; un identificador desconocido produce `404`.

## Evaluación determinista

### `POST /api/game/answer`

Entrada:

```json
{
  "missionId": "mision-pmv",
  "grade": 5,
  "challengeId": "recorrido",
  "optionId": "ruta-b-g5"
}
```

Salida:

```json
{
  "correct": true,
  "feedback": "Correcto: comparaste el número de tramos y respetaste el límite del ejercicio.",
  "editorialStatus": "synthetic-demo"
}
```

La ruta responde `200 OK`. Los retos/IDs/opciones se verifican en backend; la respuesta correcta no se incluye en el catálogo público. Payload incorrecto devuelve `400`. No hay puntaje ni persistencia de progreso.

## Ayuda contextual acotada

### `POST /api/game/assistance`

Usa la misma entrada, más `kind` con valor `hint` o `dialogue`. El estudiante no envía texto libre. Nest recupera la consigna y el texto de opción del catálogo y solicita solo una pista o pregunta breve. Respuesta: `{ "kind", "text", "provider", "reason?" }`.

La ruta responde `200 OK`. `AI_PROVIDER=mock` (valor por defecto) devuelve ayuda local sin salir del servidor. Gemini requiere `AI_PROVIDER=gemini`, `GEMINI_API_KEY` rotada y `GEMINI_MODEL=gemini-3.1-flash-lite`. La llamada usa Interactions API con `store:false`, sin herramientas, máximo 120 tokens de salida, timeout de 8 s y salida de texto de hasta 500 caracteres. Error de proveedor, salida inválida o presupuesto agotado usa el fallback. La IA no evalúa ni decide respuestas.

Antes de cada llamada Gemini se reservan USD 0.01 en `AiBudgetLedger`, cuya migración crea un presupuesto total inicial de USD 5. Cuando se recibe uso válido, se contabilizan tokens y el costo publicado para el modelo; una respuesta incierta conserva su reserva. El ledger contiene únicamente totales, no prompts ni identificadores de sesión. El límite cubre llamadas pasadas por este adaptador; las actividades de autoría externa deben contabilizarse manualmente contra el mismo total. El presupuesto del proveedor debe vigilarse también en su consola; no se confunde con el ledger local.

La clave se configura solo en `.env` local o en un gestor de secretos del servidor. No exponerla al frontend (`NEXT_PUBLIC_*`), navegador, logs ni Git. La credencial que se compartió en la conversación se considera expuesta y no debe usarse.

## Códigos y límites

Nest devuelve `400` para entradas inválidas y `404` para una misión inexistente. Los errores de ayuda del proveedor usan fallback local. `GET /api/health` verifica conectividad PostgreSQL; no es una prueba del flujo completo del videojuego.

No se crean cuentas, perfiles, identificadores de estudiante, telemetría individual ni guardado de sesiones. No enviar información personal a proveedores externos.

## Límites operativos

- Nest valida manualmente el cuerpo de las dos rutas POST y limita JSON a 16 KB. La opción correcta no se devuelve en las rutas de lectura.
- CORS acepta únicamente el origen configurado en `FRONTEND_URL`; el valor debe ser un origen HTTP(S) sin ruta. El puerto `PORT` debe estar entre 1 y 65535.
- `GET /api/health` devuelve `200` cuando la API alcanza PostgreSQL y un error HTTP si falla esa conexión. La app cierra Prisma en el apagado ordenado.
- El contrato tiene pruebas unitarias con datos sintéticos. Estas no sustituyen la verificación de arranque Compose, migración ni recorrido HTTP integrado.
