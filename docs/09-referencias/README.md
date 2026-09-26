# Referencias oficiales y provenance

## Fuentes oficiales identificadas (consultadas 2026-09-26)

- [MINEDU: Currículo Nacional de la Educación Básica](https://www.gob.pe/institucion/minedu/campa%C3%B1as/106784-curriculo-nacional-de-la-educacion-basica). Página institucional describe el CNEB y refiere aprobación RM N.° 281-2016-MINEDU y modificación RM N.° 159-2017-MINEDU. Verificar texto vigente y normas antes de usar contenido.
- [MINEDU: Programa Curricular de Educación Secundaria](https://www.gob.pe/institucion/minedu/informes-publicaciones/6791708-programa-curricular-de-educacion-secundaria). Ficha consultada muestra publicación web 21-05-2025 y descarga PDF. Esa fecha no se interpreta como fecha de aprobación o modificación curricular.
- [Repositorio institucional MINEDU: registro del Programa Curricular de Secundaria](https://repositorio.minedu.gob.pe/handle/20.500.12799/4550). Registro identifica el documento, el PDF curricular y recurso relacionado con RM 159-2017-MINEDU; cotejar PDFs y disposiciones aplicables.
- [PDF del Programa Curricular de Educación Secundaria en MINEDU](https://www.minedu.gob.pe/curriculo/pdf/programa-curricular-educacion-secundaria.pdf). Fuente revisada para I.1.1 y VI; el propio PDF/registro corresponde al documento de 2016 con documento relacionado de 2017, no a un texto que esta tarea declare consolidado con toda normativa posterior.
- [RM N.° 281-2016-MINEDU](https://www.gob.pe/institucion/minedu/normas-legales/169249-281-2016-).
- [RM N.° 649-2016-MINEDU, parte 3](https://www.gob.pe/institucion/minedu/normas-legales/169573-649-2016-minedu-parte-3), asociada a aprobación de programas curriculares.

## Reglas de uso

Fuentes secundarias, resultados de búsqueda y memoria sirven para localizar, no para confirmar. Citar documento, norma, edición y página/sección para cada afirmación curricular. Confirmar derechos de reproducción; preferir paráfrasis fiel con referencia si no se autoriza copiar. Separar fecha de carga web y versión documental. Registrar fecha de última revisión, responsable y estado. Si fuente no es accesible o la norma no está cotejada: pendiente de validación, no se promociona alineación.

## Documentación oficial de proveedores de IA y recursos

- [Gemini API: Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview) y [referencia REST](https://ai.google.dev/api/interactions-api). El endpoint admite `store:false` para no persistir la interacción por la función de estado conversacional; revisar la política de retención/abuse monitoring por separado.
- [Gemini API: precios](https://ai.google.dev/gemini-api/docs/pricing) y [facturación](https://ai.google.dev/gemini-api/docs/billing). La tarifa publicada para `gemini-3.1-flash-lite` en paid tier consultada 2026-09-26 es USD 0.25 por 1M tokens de entrada y USD 1.50 por 1M tokens de salida, incluidos tokens de pensamiento. No confundir ledger local acumulado con la vista de facturación de Google.
- [Gemini API: supervisión de abuso](https://ai.google.dev/gemini-api/docs/usage-policies) y [política de registro/uso de datos](https://ai.google.dev/gemini-api/docs/logs-policy). El texto consultado el 2026-09-26 describe retención para supervisión de abuso y otros registros según política/configuración. Antes de cualquier integración, revisar condiciones vigentes del tipo de servicio, nivel de pago y opciones activas; no enviar datos de estudiantes mientras el tratamiento no esté aprobado.
- [Gemini API: gestión de claves](https://ai.google.dev/gemini-api/docs/api-key). Incluye prácticas de protección y una transición de tipos/restricciones de claves con fechas durante 2026; confirmar el estado vigente al crear/rotar una credencial.
- [OpenAI: crear y editar imágenes en ChatGPT](https://help.openai.com/en/articles/11084440-images-in-chatgpt). Documentación funcional del flujo de imágenes, consultada 2026-09-26. Revisar términos y permisos del plan/herramienta en el momento de producir cada recurso.

Estas páginas sustentan solo cómo funciona/documenta el proveedor en la fecha de consulta. No prueban derechos exclusivos, licencia compatible del activo, ni tratamiento adecuado para menores. Consultar también la [ADR de proveedores y recursos generados](../05-arquitectura/adrs/0003-proveedores-ia-y-activos-generados.md).

## Fuentes locales para investigar (no aprobadas como contenido)

- [MINCETUR: ficha de Plaza de la Constitución, código 703](https://consultasenlinea.mincetur.gob.pe/fichaInventario/index.aspx?cod_Ficha=703). El inventario identifica el recurso en Huancayo, Junín, y ofrece descripción, ruta y bibliografía. Es un punto de partida, no una fuente primaria ni una verificación histórica independiente.
- La ficha presenta una discrepancia interna: la descripción menciona abolición de la esclavitud en 1855 y las observaciones ubican la firma en 1854. También menciona la jura de la Constitución de Cádiz en 1813 sin que esta revisión confirme día/mes o el detalle del relato. No convertir estas afirmaciones en respuestas correctas hasta cotejar fuentes primarias/archivísticas y solicitar revisión histórica/local.
- La bibliografía declarada por MINCETUR incluye un estudio de Marlene Quiroz Córdova sobre espacio público y un volumen de historia/arquitectura del Valle del Mantaro de la UNCP. Son pistas para localizar investigación, no obras verificadas ni consultadas en esta auditoría; comprobar texto, edición, autoría y permisos antes de citarlas.

Siguen pendientes: fuentes históricas primarias/locales cotejadas para los hechos que el guion elija; aprobación del polígono y calles que materializan el límite de cuatro manzanas; revisión cultural/local del mapa, personajes y guion; imágenes/audio finales y sus licencias. No tomar nombres, prácticas ni símbolos de fuentes no verificadas como datos del mundo.

## Registro

El changelog curricular está en [changelog-curricular.md](changelog-curricular.md). Se inicia con una revisión documental de enlaces/fichas, no con una validación exhaustiva del PDF ni de cada elemento curricular.
