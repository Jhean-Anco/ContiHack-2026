# Seguridad y protección de menores

## Estado actual

El scaffold no implementa usuarios, autenticación/autorización, datos del juego o analítica. El uso de PostgreSQL local/Compose no significa que exista cuenta o progreso persistido. El alcance de prototipo documentado evita identificar estudiantes.

## Amenazas a considerar antes de nuevas funciones

- Exposición de secretos de `.env`, credenciales de DB o configuración al bundle `NEXT_PUBLIC_*`.
- Inyección o contenido malicioso si el catálogo o futuras respuestas aceptan valores mutables sin validación.
- Publicación accidental de contenido en borrador o de referencias curriculares/locales sin revisión.
- Registro de payloads, texto libre o identificadores en logs y errores.
- Acceso indebido si se añaden sesiones/cuentas; manipulación de permisos por ID de objeto.
- Dependencias vulnerables, imagen Docker desactualizada, migración insegura o endpoint expuesto.
- Enlaces externos, audio/imagen subidos o contenido de usuario que contacte a menores o revele identidad.
- Integración con proveedor de IA: exposición de credencial, envío innecesario de datos, inyección de instrucciones, salidas falsas/inseguras, costos y dependencia de red.

## Controles de base para implementación

Mantener secretos fuera de Git/logs/frontend; mínimo privilegio; validar y limitar entradas en backend; codificar salida; usar errores genéricos con request ID sin stack trace; revisar dependencias y licencias; restringir CORS a orígenes esperados; TLS y headers adecuados en despliegue; limitar tasa en endpoints expuestos; no aceptar uploads/mensajería hasta que exista diseño de seguridad. Comprobar permisos por objeto si en el futuro hay identidad. Cada endpoint y dato nuevo debe tener finalidad/documentación.

El proveedor de IA elegido y sus condiciones pendientes están registrados en [ADR 0003](adrs/0003-proveedores-ia-y-activos-generados.md). No exponer claves en frontend ni subirlas a Git; no transmitir texto de estudiantes hasta que se aprueben finalidad y salvaguardas. Tratar toda salida del modelo como no confiable, validarla en servidor y disponer de fallback controlado.

## Salvaguardas de menores

No pedir nombre, correo, colegio, ubicación real, fecha de nacimiento, fotografía o voz por comodidad. Antes de investigación con menores o de persistencia, acordar finalidad, responsable, avisos, autorizaciones/consentimientos aplicables, acceso, plazo, borrado, respuesta a incidentes y revisión competente. No incluir publicidad, perfiles públicos, mensajería directa, ranking ni seguimiento individual en el alcance base.

## Revisión requerida

Hacer threat model y revisar normativa/asesoría aplicable antes de piloto público o recogida de datos. Registrar decisiones, medidas, propietario y riesgo residual en ADR. Este documento es guía de diseño, no certificación ni asesoría legal.
