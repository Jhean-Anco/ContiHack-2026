# ADR 0003: proveedores de IA y recursos visuales generados

- Estado: proveedor/usos confirmados; presupuesto total del PMV aprobado en USD 5; modo mock por defecto; adaptador Gemini implementado sin llamadas reales habilitadas.
- Fecha: 2026-09-26
- Decisores: equipo del proyecto.

## Contexto

El equipo eligió Gemini tanto para preparar contenido durante el desarrollo como para generar respuestas dinámicas en el juego. Eligió ChatGPT para crear imágenes del videojuego. Se compartió una credencial de Gemini durante la conversación; por seguridad, no se copia en documentación, código, logs ni Git y no se usó. Debe revocarse y reemplazarse antes de cualquier integración.

## Decisión documentada

1. Gemini se usará en dos momentos: (a) asistencia de autoría para preparar borradores de contenido, siempre sujetos a revisión humana; y (b) pistas y diálogo acotado durante el juego. El jugador solo elegirá opciones, sin texto libre.
2. ChatGPT es la herramienta elegida para generar recursos visuales durante la creación del producto. Las imágenes aprobadas se tratarán como archivos estáticos del juego; el cliente no generará imágenes en tiempo real.
3. Toda llamada de juego a Gemini pasará por NestJS. La credencial vivirá solo en configuración secreta del servidor (`GEMINI_API_KEY` local en `.env`, excluido de Git, y gestor de secretos en un entorno alojado). Nunca incluirla en Next.js, `NEXT_PUBLIC_*`, contenido del juego o documentación.
4. Ninguna salida generativa decide respuestas correctas, puntaje, progreso o mapeo curricular. Esas reglas y el feedback pedagógico evaluable permanecen deterministas y revisados; la IA puede generar texto de apoyo acotado una vez definido el contrato.
5. Contrato de entrada propuesto: contexto de misión/reto seleccionado en backend e ID de opción elegida. No incluir nombres, colegio, ubicación, identificadores ni historial individual. Confirmar la necesidad de transmitir el grado seleccionado antes de incluirlo. El prototipo continúa sin cuentas ni persistencia identificable.
6. Presupuesto máximo para todas las llamadas Gemini atribuibles al PMV: **USD 5 total**, no mensual. La aplicación debe mantener un ledger acumulado y rechazar llamadas cuando el saldo reservado/gastado alcance el límite; ante el corte se responde con pista local preescrita.

## Modelo y control presupuestario

Modelo inicial recomendado: `gemini-3.1-flash-lite`, de texto, sin herramientas de búsqueda ni generación de imágenes; confirmar disponibilidad/condiciones al integrar. La página oficial consultada el 2026-09-26 publica para paid tier USD 0.25 por 1M tokens de entrada y USD 1.50 por 1M tokens de salida. Google indica que el free tier puede usar prompts/salidas para mejorar productos, mientras que paid tier no; las respuestas de estudiantes no deben enviarse vía free tier. Véase [pricing oficial](https://ai.google.dev/gemini-api/docs/pricing).

La cuota del proyecto no depende del tope de facturación mensual de Google. El adaptador implementado reserva USD 0.01 antes de cada llamada, limita la salida a 120 tokens y liquida el costo con el uso informado por Gemini; una respuesta incierta conserva su reserva. Se persiste solo el ledger acumulado. Este control cubre llamadas del juego a través de Nest; la autoría en aplicaciones externas debe descontarse manualmente del mismo total de USD 5. Evitar grounding, audio e imágenes en Gemini. La facturación Google puede tardar en reflejar costos y su límite mensual por tier no es un tope total de USD 5; revisar [billing](https://ai.google.dev/gemini-api/docs/billing) y sus condiciones al crear proyecto/clave. El proveedor continúa apagado por defecto (`AI_PROVIDER=mock`).

## Pendientes antes de activar Gemini real

- Especificar tipos de pistas y diálogo permitidos, fuentes de contexto y esquema de salida; validar que el modelo no resuelva respuestas correctas, puntaje ni evaluación.
- Confirmar exactamente qué IDs/contexto viajan y aprobar el tratamiento externo/retención con las salvaguardas aplicables. Hasta entonces usar adaptador simulado y no enviar datos de juego.
- Definir entradas/salidas JSON, límites de longitud/tiempo/costo, manejo de contenido inseguro, validación en servidor, fallback sin red y qué respuestas estarán prefijadas/revisadas.
- Validar el modelo recomendado y su tarifa actual, y probar el tope acumulado antes de aceptar llamadas reales.
- Revocar la clave expuesta y crear otra; probarla localmente sin imprimirla ni versionarla.

Antes de enviar prompts de estudiantes, revisar expresamente la política vigente de [abuse monitoring de Gemini](https://ai.google.dev/gemini-api/docs/usage-policies): la documentación consultada indica retención por 55 días de prompts, contexto y salidas para monitoreo de uso indebido, con posible revisión de contenido marcado. No asumir que el dato se procesa sin retención. La [guía oficial de claves](https://ai.google.dev/gemini-api/docs/api-key) recomienda gestión segura en variables/secretos y documenta el flujo de claves de autorización; confirmar tipo/restricciones al crear la nueva clave.

## Consecuencias y revisión de arte

El flujo de imágenes es fuera de línea: brief/prompt, generación, curaduría humana, optimización, texto alternativo y registro de herramienta/fecha/condiciones de uso/licencia/provenance antes de añadir el archivo. Ninguna imagen generada se presenta como fotografía, mapa oficial o evidencia histórica. Véase [arte y recursos](../../02-game-design/arte-recursos.md).

La guía oficial [Imágenes en ChatGPT](https://help.openai.com/en/articles/11084440-images-in-chatgpt) documenta creación, edición y descarga de recursos; revisar de nuevo disponibilidad y condiciones vigentes en el momento de producir activos.

Al abrir la integración se revisarán riesgos de inyección de prompts, respuestas no confiables, fuga de secretos, costos/abuso, disponibilidad y uso de datos de menores. Este ADR documenta proveedores elegidos, no acredita una integración, aprobación legal ni autorización de tratamiento de datos.
