# ADR 0002: alcance del PMV y vertical slice

- Estado: alcance del primer corte confirmado por el equipo; contenido pedagógico e histórico pendiente de revisión.
- Fecha: 2026-09-26
- Decisores: equipo del proyecto.

## Contexto

El repositorio contiene solo el scaffold técnico y no tiene juego, contenido de dominio ni modelos del juego implementados. El equipo especificó 1.º–5.º de Secundaria, historia de Huancayo en Ciencias Sociales, Matemática, entorno alrededor de Plaza Constitución con un máximo de cuatro manzanas y colaboración de Codex y Claude.

## Decisión de alcance

1. La audiencia incluye los cinco grados de Secundaria; no reducir el producto a Ciclo VI ni tratar Ciclo VII como expansión opcional.
2. Las dos áreas prioritarias son Ciencias Sociales (historia de Huancayo) y Matemática.
3. El área jugable tendrá como ancla Plaza Constitución, en Huancayo, Junín. Ningún punto jugable estará a más de cuatro manzanas de recorrido desde la plaza; el polígono exacto requiere cartografía y revisión local.
4. El producto se plantea como videojuego web interactivo. El contenido histórico y los mapeos curriculares no se consideran aprobados hasta pasar sus revisiones.
5. Se permite crear arte de personajes y espacios con ChatGPT y aplicaciones externas, con registro de procedencia/licencia y revisión cultural, editorial y de accesibilidad.
6. La colaboración documentada incluye Codex y Claude sobre un conjunto compartido de docs; cada tarea debe tener responsable y revisor. Ningún agente sustituye la validación de especialistas.
7. El primer mapa será esquemático; no se presentará como cartografía exacta de calles hasta delimitar y revisar el plano dentro del máximo de cuatro manzanas.

## Primer vertical slice confirmado

El equipo confirmó una misión integrada con cinco variantes (una por grado) y dos retos conectados: (a) interpretar fuentes sobre historia local; (b) orientarse y comparar recorridos usando primero un mapa esquemático. La elección del hecho, fuentes, objetivos por grado y reglas/feedback concretos siguen sujetos a revisión curricular, histórica y pedagógica. El mapa esquemático no acredita por sí mismo que los puntos cumplan cuatro manzanas reales.

Sin cuenta ni persistencia identificable en el prototipo inicial; progreso temporal y reiniciable, conforme a ADR 0001. XP, si se incluye, es cosmético y separado de evidencia pedagógica. El proveedor de IA elegido, Gemini, se usará para autoría y para respuestas dinámicas dentro del juego, sujeto a los gates de ADR 0003; el juego debe conservar respuestas correctas, evaluación y progreso deterministas y revisados.

La estructura acordada define un corte pequeño y verificable; no reemplaza el diseño curricular por grado, el guion ni la validación histórica. Detalle en [concepto PMV](../../02-game-design/concepto-pmv.md).

## Alternativas consideradas

- Prototipar solo Ciclo VI y dejar 3.º–5.º para una fase posterior: descartado para el alcance declarado, que abarca los cinco grados.
- Usar Matemática + Ciencia y Tecnología: descartado; las áreas confirmadas por el equipo son Ciencias Sociales y Matemática.
- Recrear con precisión documentada un barrio completo: no se adopta; el límite de cuatro manzanas y la revisión de fuentes reducen el alcance. La topología exacta sigue pendiente.
- Guardar perfiles o progreso: diferido por minimización de datos de menores; requiere ADR y análisis de privacidad.

## Consecuencias y condiciones

El primer corte debe incluir variantes para cinco grados, por lo que el esfuerzo de contenido es mayor que para una demo de un solo ciclo. Los retos requieren objetivos internos distintos y revisión curricular grado por grado; no publicar mapeos pendientes. La geometría, los hitos y los eventos históricos necesitan fuentes y revisión local. Un desarrollo de UI, mapa abstracto y sistemas reutilizables puede avanzar con textos/datos ficticios claramente rotulados, pero la misión histórica publicable queda bloqueada hasta cerrar provenance y revisión. Pruebas con menores requieren protocolo, autorizaciones y salvaguardas previas.

## Verificación requerida

- Confirmar que el mapa cumple el máximo de cuatro manzanas desde la plaza en el plano de referencia aprobado.
- Verificar que existen cinco variantes de grado, dos tipos de reto, feedback, pista y reintento.
- Validar fuentes históricas y correspondencia curricular con especialista; registrar fuente, versión, localizador y revisión.
- Revisar arte, licencias, accesibilidad, privacidad y estados de error.
- Distinguir construcción técnica, revisión documental y pruebas con estudiantes; no declarar el PMV aceptado antes de contar con evidencia de las últimas.
