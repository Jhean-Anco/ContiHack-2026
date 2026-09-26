# Documentación de ContiHack 2026

Documentación de producto, pedagógica y técnica del PMV de un videojuego educativo web para estudiantes de Educación Secundaria del Perú. Las decisiones y propuestas no implican aprobación pedagógica o histórica. Estado del código: primera interfaz `/jugar`, flujo de sesión, endpoints backend escritos y cliente frontend conectado; el backend aún no se ha compilado ni levantado. Las fichas son sintéticas, sin currículo aprobado, y no hay cuentas ni progreso persistente.

## Cómo leerla

- [Visión y problema](00-producto/README.md)
- [Pedagogía y trazabilidad curricular](01-pedagogia/README.md)
- [Game design](02-game-design/README.md)
- [Contenido del PMV](03-contenido/README.md)
- [UX/UI y accesibilidad](04-ux-ui/README.md)
- [Arquitectura y decisiones](05-arquitectura/README.md)
- [Roadmap e implementación](06-implementacion/README.md)
- [Preparación para iniciar el PMV](06-implementacion/preparacion-pmv.md)
- [Reglas y colaboración de agentes](07-agentes/README.md)
- [Calidad, pruebas, privacidad y riesgos](08-calidad/README.md)
- [Fuentes oficiales y changelog curricular](09-referencias/README.md)
- [Auditoría documental, cobertura y pendientes](auditoria-documental.md)

## Principios no negociables

1. El PMV se limita a estudiantes de 1.º a 5.º de Educación Secundaria del Perú. Sus áreas prioritarias son Ciencias Sociales (historia de Huancayo) y Matemática. Primaria queda fuera del alcance actual.
2. No se inventan competencias, capacidades, estándares, desempeños ni datos oficiales del CNEB. Cada afirmación curricular debe tener fuente y versión; lo no verificado queda pendiente.
3. XP es una recompensa de juego, no evidencia de dominio o aprendizaje.
4. Contenido, reglas pedagógicas y referencias curriculares se mantienen desacoplados de la interfaz.
5. Los cambios de alcance se justifican con ADR antes de implementarse.
6. Una propuesta documentada no es una funcionalidad construida ni validada con estudiantes.

## Documentación técnica existente preservada

Las guías previas se mantienen y forman parte del índice: [arquitectura](arquitectura.md), [desarrollo local](desarrollo-local.md), [configuración](configuracion.md), [Docker](docker.md) y [Git/GitHub](git-github.md). La documentación nueva las complementa; consulta [arquitectura](05-arquitectura/arquitectura-general.md) para el estado real y la dirección objetivo.

## Estado y mantenimiento

Estado del producto: primer slice confirmado como una misión, cinco variantes y dos retos conectados; se inicia con mapa esquemático. Gemini se reserva para autoría y pistas/diálogo; el modo mock es el predeterminado. ChatGPT queda para crear imágenes fuera de línea. El código tiene interfaz y lógica iniciales, con ejecución integrada pendiente. Objetivos curriculares por grado, contenido histórico, mapa real, revisión de privacidad y criterios de éxito aún requieren definición/revisión. Ver la [matriz de preparación del PMV](06-implementacion/preparacion-pmv.md). Registrar cambios curriculares en el [changelog](09-referencias/changelog-curricular.md) y decisiones técnicas/producto en [ADRs](05-arquitectura/adrs/README.md). Última revisión: 2026-09-26.
