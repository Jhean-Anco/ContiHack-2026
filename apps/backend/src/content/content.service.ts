import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import {
  findCorrectOptionId,
  getChallenge,
  makeMissionVariant,
} from "./mission.catalog.js";
import type { AssistanceKind, AssistanceRequest, Grade, PublicMission } from "./content.types.js";

const MISSION_ID = "mision-pmv";
const MISSION: Omit<PublicMission, "variant"> = {
  id: MISSION_ID,
  contentVersion: "0.1.0-synthetic",
  editorialStatus: "synthetic-demo",
  title: "Rutas y fuentes: plaza de práctica",
  description: "Misión demostrativa para explorar evidencia temporal y comparar recorridos esquemáticos.",
  location: {
    anchor: "Plaza Constitución, Huancayo",
    mapMode: "schematic",
    note: "Mapa ilustrativo; no representa calles ni distancias reales.",
  },
  areas: ["Ciencias Sociales", "Matemática"],
  curricularMappings: [],
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isGrade = (value: unknown): value is Grade =>
  typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  getManifest() {
    return {
      contentVersion: MISSION.contentVersion,
      editorialStatus: "synthetic-demo",
      missions: [{ id: MISSION_ID, title: MISSION.title, grades: [1, 2, 3, 4, 5] }],
    };
  }

  getMission(id: string, gradeValue: string | undefined): PublicMission {
    if (id !== MISSION_ID) throw new NotFoundException("Misión no encontrada.");
    if (!gradeValue || !/^[1-5]$/.test(gradeValue)) {
      throw new BadRequestException("El grado debe estar entre 1 y 5.");
    }
    const grade = Number(gradeValue) as Grade;
    return { ...MISSION, variant: makeMissionVariant(grade) };
  }

  answer(value: unknown) {
    if (!isRecord(value) || value.missionId !== MISSION_ID || !isGrade(value.grade)) {
      throw new BadRequestException("La selección enviada no es válida.");
    }
    if (value.challengeId !== "fuentes" && value.challengeId !== "recorrido") {
      throw new BadRequestException("El reto enviado no existe.");
    }
    if (typeof value.optionId !== "string" || value.optionId.length > 40) {
      throw new BadRequestException("La opción enviada no es válida.");
    }
    const challenge = getChallenge(value.grade, value.challengeId);
    if (!challenge || !challenge.options.some(({ id }) => id === value.optionId)) {
      throw new BadRequestException("La opción no pertenece al reto.");
    }
    const correct = findCorrectOptionId(value.grade, value.challengeId) === value.optionId;
    return {
      correct,
      feedback: correct ? challenge.feedback.correct : challenge.feedback.retry,
      editorialStatus: "synthetic-demo" as const,
    };
  }

  async assist(payload: unknown) {
    const request = this.parseAssistance(payload);
    const challenge = getChallenge(request.grade, request.challengeId);
    const selected = challenge?.options.find(({ id }) => id === request.optionId);
    if (!challenge || !selected) throw new BadRequestException("La opción no pertenece al reto.");

    if (process.env.AI_PROVIDER !== "gemini" || !process.env.GEMINI_API_KEY) {
      return this.staticAssistance(request.kind, challenge.prompt, selected.label);
    }

    const reservation = 0.01;
    let reserved = false;
    try {
      reserved = await this.reserveBudget(reservation);
    } catch {
      // If the ledger is unavailable, keep assistance local and never contact Gemini.
      return this.staticAssistance(request.kind, challenge.prompt, selected.label, "budget-unavailable");
    }
    if (!reserved) return this.staticAssistance(request.kind, challenge.prompt, selected.label, "budget-exhausted");

    try {
      const response = await this.callGemini(request, challenge.prompt, selected.label);
      if (!response.text || response.text.length > 500 || !response.usage) {
        throw new Error("Gemini response did not meet the bounded output contract");
      }
      const inputTokens = this.tokenCount(response.usage.total_input_tokens);
      const outputTokens = this.tokenCount(response.usage.total_output_tokens) + this.tokenCount(response.usage.total_thought_tokens);
      const actualUsd = (inputTokens * 0.25 + outputTokens * 1.5) / 1_000_000;
      const settled = await this.prisma.$executeRaw`
        UPDATE "AiBudgetLedger"
        SET "spentUsd" = "spentUsd" + ${actualUsd},
            "reservedUsd" = "reservedUsd" - ${reservation},
            "requests" = "requests" + 1,
            "inputTokens" = "inputTokens" + ${BigInt(inputTokens)},
            "outputTokens" = "outputTokens" + ${BigInt(outputTokens)},
            "updatedAt" = NOW()
        WHERE "id" = 1
          AND "reservedUsd" >= ${reservation}
          AND "spentUsd" + "reservedUsd" - ${reservation} + ${actualUsd} <= "budgetUsd"
      `;
      if (settled !== 1) {
        // Keep the reservation on an uncertain settlement so another call cannot exceed the cap.
        return this.staticAssistance(request.kind, challenge.prompt, selected.label, "reservation-cap-reached");
      }
      return { kind: request.kind, text: response.text, provider: "gemini" as const };
    } catch {
      // Keep the reservation when the provider result is uncertain; it protects the total cap.
      return this.staticAssistance(request.kind, challenge.prompt, selected.label, "provider-unavailable");
    }
  }

  private parseAssistance(value: unknown): AssistanceRequest {
    if (!isRecord(value) || value.missionId !== MISSION_ID || !isGrade(value.grade)) {
      throw new BadRequestException("La solicitud de ayuda no es válida.");
    }
    if (value.challengeId !== "fuentes" && value.challengeId !== "recorrido") {
      throw new BadRequestException("El reto enviado no existe.");
    }
    if (value.kind !== "hint" && value.kind !== "dialogue") {
      throw new BadRequestException("El tipo de ayuda no está permitido.");
    }
    if (typeof value.optionId !== "string" || value.optionId.length > 40) {
      throw new BadRequestException("La opción enviada no es válida.");
    }
    return value as AssistanceRequest;
  }

  private staticAssistance(kind: AssistanceKind, prompt: string, selected: string, reason = "mock") {
    const text = kind === "hint"
      ? `Pista: vuelve a leer la consigna («${prompt}») y compara los datos de las opciones antes de elegir.`
      : `Revisemos tu elección («${selected}»): ¿qué dato de la consigna la respalda?`;
    return { kind, text, provider: "fallback" as const, reason };
  }

  private async reserveBudget(amount: number): Promise<boolean> {
    const changed = await this.prisma.$executeRaw`
      UPDATE "AiBudgetLedger"
      SET "reservedUsd" = "reservedUsd" + ${amount}, "updatedAt" = NOW()
      WHERE "id" = 1 AND "spentUsd" + "reservedUsd" + ${amount} <= "budgetUsd"
    `;
    return changed === 1;
  }

  private async callGemini(request: AssistanceRequest, prompt: string, selected: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";
    if (!apiKey || model !== "gemini-3.1-flash-lite") throw new Error("Gemini is not configured for the approved model");
    const gameInput = request.kind === "hint"
      ? `Reto: ${prompt}\nOpción elegida: ${selected}\nDa una única pista pedagógica, breve (máximo 45 palabras), sin revelar la respuesta.`
      : `Reto: ${prompt}\nOpción elegida: ${selected}\nResponde como guía del videojuego con una pregunta breve (máximo 45 palabras), sin evaluar ni revelar la respuesta.`;
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        model,
        input: `Eres un asistente educativo para adolescentes. Usa español claro. Solo orienta sobre este ejercicio sintético, no afirmes hechos históricos reales. No solicites información personal.\n${gameInput}`,
        store: false,
        generation_config: { max_output_tokens: 120, thinking_level: "minimal" },
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Gemini returned HTTP ${response.status}`);
    const result: unknown = await response.json();
    if (!isRecord(result)) throw new Error("Invalid Gemini response");
    const steps = Array.isArray(result.steps) ? result.steps : [];
    const text = steps.flatMap((step) => isRecord(step) && Array.isArray(step.content) ? step.content : [])
      .filter((part) => isRecord(part) && part.type === "text" && typeof part.text === "string")
      .map((part) => (part as { text: string }).text)
      .join(" ").trim();
    const usage = isRecord(result.usage) ? result.usage : undefined;
    return { text, usage };
  }

  private tokenCount(value: unknown): number {
    return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
  }
}
