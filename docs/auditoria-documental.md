# Auditoría documental de `docs/`

**Fecha:** 2026-09-26

**Alcance:** revisión de documentos Markdown del repositorio y contraste con estructura/configuración del código disponible.

**Resultado:** la carpeta ahora presenta una línea base coherente para el diseño del PMV secundario. Esto no significa que el juego, currículo por grado, historia local o accesibilidad estén implementados o validados externamente.

## Resultado por área

| Área solicitada | Evidencia documental | Estado y límite actual |
|---|---|---|
| Producto | `00-producto/README.md` | Visión, problema como hipótesis, propuesta de valor, alcance, exclusiones, glosario y decisiones pendientes. |
| Pedagogía | `01-pedagogia/` | Modelo, currículo, habilidades, progresión/XP separada, demanda, misión integrada, evaluación y trazabilidad. Diseño interno; mapeos por reto/grado no aprobados. |
| Game design | `02-game-design/` | GDD, loop, jugador, NPC, sistemas, XP, mapa/arte y concepto de una misión. Está confirmada la estructura de un slice con dos retos y cinco variantes; cantidad de NPC, guion y detalle de respuestas siguen pendientes. |
| Contenido | `03-contenido/` | Modelo editorial, catálogo de propuesta, grados/ciclos, áreas y ciclo de validación. No existe contenido de juego en el código. |
| UX/UI | `04-ux-ui/` | Flujo, pantallas/estados, HUD, sistema visual y accesibilidad. No hay prototipo jugable ni auditoría WCAG hecha. |
| Arquitectura | `05-arquitectura/` y guías técnicas raíz | Contratos existentes/propuestos, límites por capa, dominio conceptual, estados, seguridad y ADR. Predomina estado scaffold; dominio de juego no implementado. |
| Implementación | `06-implementacion/` | Roadmap sin fechas inventadas, backlog, DoR/DoD y matriz de preparación/gates. |
| Agentes | `AGENTS.md`, `CLAUDE.md`, `07-agentes/` | Fuente única de reglas, responsabilidades y handoff común. |
| Calidad | `08-calidad/` | Plan de tests, jugabilidad/pedagogía, privacidad, analítica, deployment, aceptación y riesgos. Los tests de juego no existen. |
| Referencias | `09-referencias/` | Fuentes oficiales identificadas, reglas de provenance, changelog curricular y ficha local MINCETUR como pista, no evidencia concluyente. |

## Hallazgos corregidos en esta revisión

1. Se alineó la documentación pedagógica con 1.º–5.º de Secundaria, Ciencias Sociales e Historia de Huancayo y Matemática. El equipo confirmó una misión, cinco variantes de grado, dos retos relacionados y mapa esquemático inicial. Se retiró el ejemplo anterior de tres misiones y Ciencia y Tecnología como foco.
2. Se aclaró que indagación histórica y orientación espacial son dos tipos de reto/fases dentro de una misión; el cierre integrador no fija un tercer reto cuantitativo.
3. Se corrigieron textos que podían presentar funciones propuestas como ya implementadas (especialmente publicación por API y catálogo).
4. Se ampliaron apartados que eran notas breves para hacer explícitos esquema, criterios, estados, validaciones, flujos y límites de los modelos propuestos.
5. Se documentó la discrepancia interna sobre la fecha de abolición que presenta la ficha MINCETUR; no se resuelve desde esa ficha ni se autoriza su uso como respuesta de juego.
6. Se registró Gemini para preparar contenido y generar pistas/diálogo acotado durante la partida, con elecciones cerradas sin texto libre; ChatGPT queda para imágenes. La clave compartida no se guardó ni se usó.

## Pendientes de validación externa/producto

- Revisión por especialista de currículo y matriz por grado/área con fuente, norma, edición, página/sección y evidencia observable. El PDF oficial consultado no basta para afirmar que se comprobó toda normativa vigente. Estado de toda alineación de misiones: **pendiente**.
- Seleccionar hechos históricos concretos; localizar y cotejar fuentes primarias/archivísticas/locales, resolver discrepancias, registrar citas/licencias y obtener revisión competente/local.
- Definir el plano/polígono exacto, puntos de interés y cálculo del máximo de cuatro manzanas caminadas desde la Plaza Constitución; obtener revisión local. El mapa no es guía de navegación real.
- Completar objetivos curriculares por grado, variantes/duración, guion, criterios de éxito y contrato/límites de respuestas dinámicas de Gemini.
- Completar revisión de arte/recursos, accesibilidad manual y pruebas de jugabilidad con protocolo y salvaguardas antes de reclutar menores.
- Definir deployment y, si cambia el prototipo sin datos a un producto persistente, privacidad, identidad, analítica y retención vía ADR.

Estos puntos no se pueden resolver honestamente solo editando documentación: requieren evidencia, decisión del equipo o revisión especialista. Hasta entonces deben mantenerse marcados como pendientes y no bloquear el trabajo estructural con placeholders ficticios claramente rotulados.

## Comprobaciones locales realizadas

- Se inventariaron archivos Markdown de `docs/` y se revisaron enlaces relativos; resultado de esta actualización: **51 archivos Markdown y sin destinos locales rotos**.
- Se buscaron referencias obsoletas a Ciclo VI como piloto, tres misiones, Ciencia y Tecnología como área foco y estados no implementados presentados como existentes; se corrigieron las divergencias halladas.
- Se contrastó la documentación de stack con manifiestos de `apps/frontend` y `apps/backend`, `compose.yaml`, Prisma schema/config y controlador de salud. Se mantuvieron Next.js/React/Tailwind, NestJS, Prisma/PostgreSQL y Compose; no se añadió tecnología.
- No se ejecutaron pruebas de aplicación ni builds: el cambio de esta tarea es documental. Los comandos de verificación técnica están descritos en `08-calidad/README.md` para cuando se implemente el juego.

## Mantenimiento

Actualizar esta auditoría cada vez que cambie alcance, arquitectura, estado de mapeos curriculares o resultado de un gate. Al cerrar un pendiente, incluir fuente/decisión, evidencia, responsable y fecha; no sustituirlo por una afirmación no trazable.
