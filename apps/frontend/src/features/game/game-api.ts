export type GradoJuego = 1 | 2 | 3 | 4 | 5;
export type RetoId = "fuentes" | "recorrido";
export type TipoAyuda = "hint" | "dialogue";

export interface OpcionJuego {
  id: string;
  label: string;
}

export interface RetoJuego {
  id: RetoId;
  title: string;
  prompt: string;
  options: OpcionJuego[];
  feedback: { correct: string; retry: string };
}

export interface MisionJuego {
  id: string;
  contentVersion: string;
  editorialStatus: "synthetic-demo";
  title: string;
  description: string;
  location: { anchor: string; mapMode: "schematic"; note: string };
  areas: ["Ciencias Sociales", "Matemática"];
  curricularMappings: [];
  variant: {
    grade: GradoJuego;
    editorialStatus: "synthetic-demo";
    historyCards: Array<{ id: string; title: string; text: string }>;
    challenges: RetoJuego[];
  };
}

export interface ResultadoRespuesta {
  correct: boolean;
  feedback: string;
  editorialStatus: "synthetic-demo";
}

export interface RespuestaAyuda {
  kind: TipoAyuda;
  text: string;
  provider: "fallback" | "gemini";
  reason?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}/api${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? `La API respondió con error (${response.status}).`);
  }
  return (await response.json()) as T;
}

export const gameApi = {
  getMission(missionId: string, grade: GradoJuego, signal?: AbortSignal) {
    return api<MisionJuego>(`/content/missions/${encodeURIComponent(missionId)}?grade=${grade}`, { signal });
  },
  submitAnswer(input: { grade: GradoJuego; challengeId: RetoId; optionId: string }, signal?: AbortSignal) {
    return api<ResultadoRespuesta>("/game/answer", {
      method: "POST",
      body: JSON.stringify({ missionId: "mision-pmv", ...input }),
      signal,
    });
  },
  requestAssistance(input: {
    grade: GradoJuego;
    challengeId: RetoId;
    optionId: string;
    kind: TipoAyuda;
  }, signal?: AbortSignal) {
    return api<RespuestaAyuda>("/game/assistance", {
      method: "POST",
      body: JSON.stringify({ missionId: "mision-pmv", ...input }),
      signal,
    });
  },
};
