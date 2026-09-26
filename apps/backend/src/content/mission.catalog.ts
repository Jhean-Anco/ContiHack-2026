import type { Challenge, Grade, MissionVariant } from "./content.types.js";

const historyTasks: Record<Grade, { prompt: string; dates: [number, number] }> = {
  1: {
    prompt: "Según las fechas ficticias de las tarjetas, ¿qué registro ocurrió primero?",
    dates: [1910, 1916],
  },
  2: {
    prompt: "¿Qué afirmación está respaldada únicamente por el orden de las fechas mostradas?",
    dates: [1904, 1909],
  },
  3: {
    prompt: "¿Cuál conclusión se sostiene al contrastar las dos fichas sintéticas?",
    dates: [1898, 1912],
  },
  4: {
    prompt: "¿Qué comparación cronológica puede justificarse sin añadir información externa?",
    dates: [1887, 1903],
  },
  5: {
    prompt: "¿Qué afirmación se limita estrictamente a la evidencia temporal de estas fichas?",
    dates: [1879, 1921],
  },
};

const routeTasks: Record<Grade, { prompt: string; lengths: [number, number]; limit: number }> = {
  1: {
    prompt: "En este mapa ilustrativo, ¿qué ruta tiene menos tramos?",
    lengths: [2, 3],
    limit: 3,
  },
  2: {
    prompt: "¿Qué ruta llega al punto de práctica usando menos manzanas esquemáticas?",
    lengths: [4, 3],
    limit: 4,
  },
  3: {
    prompt: "Ambas rutas llegan al destino. ¿Cuál cumple la condición de usar como máximo cuatro tramos y resulta más corta?",
    lengths: [4, 3],
    limit: 4,
  },
  4: {
    prompt: "El recorrido debe tener cuatro tramos o menos. ¿Qué alternativa satisface la condición con menor distancia?",
    lengths: [4, 3],
    limit: 4,
  },
  5: {
    prompt: "Compara las longitudes representadas. ¿Qué ruta minimiza tramos sin superar el límite ilustrativo?",
    lengths: [4, 2],
    limit: 4,
  },
};

function makeHistoryChallenge(grade: Grade): Challenge {
  const task = historyTasks[grade];
  const [firstYear, secondYear] = task.dates;

  return {
    id: "fuentes",
    title: "Contrasta dos fichas de práctica",
    prompt: task.prompt,
    options: [
      { id: "a-primero", label: `La ficha A (${firstYear}) es anterior a la ficha B (${secondYear}).` },
      { id: "b-primero", label: `La ficha B (${secondYear}) es anterior a la ficha A (${firstYear}).` },
      { id: "no-se-sabe", label: "Las fechas no permiten comparar el orden." },
    ],
    feedback: {
      correct: "Correcto: la fecha permite comparar el orden, pero no demuestra otros hechos sobre el pasado.",
      retry: "Vuelve a mirar solo los años de ambas fichas. ¿Cuál es menor?",
    },
  };
}

function makeRouteChallenge(grade: Grade): Challenge {
  const task = routeTasks[grade];
  const [routeA, routeB] = task.lengths;
  const options = [
    { id: "ruta-a", label: `Ruta A: ${routeA} tramos esquemáticos.` },
    { id: "ruta-b", label: `Ruta B: ${routeB} tramos esquemáticos.` },
    { id: "ambas", label: "Ambas rutas tienen la misma longitud." },
  ];
  return {
    id: "recorrido",
    title: "Elige una ruta en el mapa esquemático",
    prompt: task.prompt,
    options: options.map((option) => ({ ...option, id: `${option.id}-g${grade}` })),
    feedback: {
      correct: "Correcto: comparaste el número de tramos y respetaste el límite del ejercicio.",
      retry: "Compara la longitud de las dos rutas y revisa el límite indicado en la pregunta.",
    },
  };
}

export function makeMissionVariant(grade: Grade): MissionVariant {
  const task = historyTasks[grade];
  const historyChallenge = makeHistoryChallenge(grade);
  const routeChallenge = makeRouteChallenge(grade);

  return {
    grade,
    editorialStatus: "synthetic-demo",
    historyCards: [
      {
        id: "ficha-a",
        title: "Ficha de práctica A",
        text: `Registro demostrativo sin vínculo con Huancayo. Fecha ficticia: ${task.dates[0]}.`,
      },
      {
        id: "ficha-b",
        title: "Ficha de práctica B",
        text: `Registro demostrativo sin vínculo con Huancayo. Fecha ficticia: ${task.dates[1]}.`,
      },
    ],
    challenges: [historyChallenge, routeChallenge],
  };
}

export function findCorrectOptionId(grade: Grade, challengeId: string): string | undefined {
  if (challengeId === "fuentes") {
    const [first, second] = historyTasks[grade].dates;
    return first < second ? "a-primero" : "b-primero";
  }

  if (challengeId === "recorrido") {
    const [routeA, routeB] = routeTasks[grade].lengths;
    const limit = routeTasks[grade].limit;
    if (routeA <= limit && routeA < routeB) return `ruta-a-g${grade}`;
    if (routeB <= limit && routeB < routeA) return `ruta-b-g${grade}`;
    return `ambas-g${grade}`;
  }

  return undefined;
}

export function getChallenge(grade: Grade, challengeId: string): Challenge | undefined {
  return makeMissionVariant(grade).challenges.find((challenge) => challenge.id === challengeId);
}
