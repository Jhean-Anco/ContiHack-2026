# Accesibilidad

## Estándar de referencia

Usar **WCAG 2.2 nivel AA como objetivo de diseño y evaluación**, salvo que una obligación legal o contractual aplicable establezca un alcance distinto. WCAG 2.2 es una Recomendación del W3C; revisar el [estándar](https://www.w3.org/TR/WCAG22/) al planificar una auditoría. No declarar conformidad solo por pasar comprobadores automáticos: la evaluación combina inspección técnica y revisión manual con tecnologías de asistencia.

## Requisitos de interfaz

Diseñar y probar navegación completa por teclado, orden/foco visible y no obstruido, HTML semántico y nombres accesibles, lectores de pantalla, ampliación/zoom, contraste, texto escalable, alternativas a audio/color, controles táctiles amplios, tiempo flexible, instrucciones claras, subtítulos/transcripciones para medios y reducción de movimiento. Evitar arrastre como único método, temporizadores forzosos y animación necesaria para comprender un resultado. Los retos deben poder pausarse; no depender de memoria de una pantalla anterior ni de precisión motora fina. Incluir diversidad de habilidades, lenguaje y acceso a dispositivos/red.

## Verificación por entrega

Frontend: revisión semántica de componentes, teclado, foco, ampliación, contraste, lectores y controles táctiles. Probar interacciones y estados de error, no solo capturas. Registrar criterio afectado, página/estado, dispositivo/AT, resultado, barrera y corrección.

Lo implementado en el prototipo: HTML semántico y controles nativos (radios, casillas, botones y enlaces reales), foco visible global en `:focus-visible`, salto al contenido principal, foco contenido y devuelto en los diálogos con cierre por Escape, foco movido al cambiar de pantalla y al recibir feedback, región `aria-live` para anuncios, alternativa textual equivalente al esquema del mapa, mínimo táctil de 44 px, estados comunicados con palabra y símbolo además del color, `prefers-reduced-motion`, `prefers-color-scheme` y viewport sin `maximum-scale`.

Nada de eso equivale a una auditoría: no se ha probado con lectores de pantalla ni teclado en varios navegadores, no se ha medido contraste con herramienta, no se ha verificado ampliación al 200 % sobre la página y no se declara conformidad WCAG.
