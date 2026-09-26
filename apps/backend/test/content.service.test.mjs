import assert from "node:assert/strict";
import { test } from "node:test";

import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ContentService } from "../dist/src/content/content.service.js";

const service = new ContentService({
  async $executeRaw() {
    return 0;
  },
});

test("expone cinco variantes sintéticas con dos retos y sin respuesta en el catálogo", () => {
  const manifest = service.getManifest();
  assert.deepEqual(manifest.missions[0].grades, [1, 2, 3, 4, 5]);
  assert.equal(manifest.editorialStatus, "synthetic-demo");

  for (let grade = 1; grade <= 5; grade += 1) {
    const mission = service.getMission("mision-pmv", String(grade));
    assert.equal(mission.variant.grade, grade);
    assert.equal(mission.variant.challenges.length, 2);
    assert.deepEqual(mission.variant.challenges.map(({ id }) => id), ["fuentes", "recorrido"]);
    for (const challenge of mission.variant.challenges) {
      assert.ok(challenge.options.length >= 2);
      assert.equal("correctOptionId" in challenge, false);
    }
  }
});

test("rechaza grados, misión y opciones fuera del contrato", () => {
  assert.throws(() => service.getMission("mision-pmv", "0"), BadRequestException);
  assert.throws(() => service.getMission("mision-pmv", "01"), BadRequestException);
  assert.throws(() => service.getMission("otra", "1"), NotFoundException);
  assert.throws(
    () => service.answer({ missionId: "mision-pmv", grade: "1", challengeId: "fuentes", optionId: "a-primero" }),
    BadRequestException,
  );
  assert.throws(
    () => service.answer({ missionId: "mision-pmv", grade: 1, challengeId: "fuentes", optionId: "desconocida" }),
    BadRequestException,
  );
});

test("evalúa respuestas correctas e incorrectas en el servidor para todos los grados", () => {
  const correctAnswers = ["a-primero", "a-primero", "a-primero", "a-primero", "a-primero"];
  const correctRoutes = ["ruta-a-g1", "ruta-b-g2", "ruta-b-g3", "ruta-b-g4", "ruta-b-g5"];

  for (let index = 0; index < 5; index += 1) {
    const grade = index + 1;
    for (const [challengeId, optionId] of [["fuentes", correctAnswers[index]], ["recorrido", correctRoutes[index]]]) {
      const result = service.answer({ missionId: "mision-pmv", grade, challengeId, optionId });
      assert.equal(result.correct, true);
      assert.equal(result.editorialStatus, "synthetic-demo");

      const incorrectId = challengeId === "fuentes"
        ? "b-primero"
        : `${grade === 1 ? "ruta-b" : "ruta-a"}-g${grade}`;
      if (incorrectId !== optionId) {
        const retry = service.answer({ missionId: "mision-pmv", grade, challengeId, optionId: incorrectId });
        assert.equal(retry.correct, false);
        assert.ok(retry.feedback.length > 0);
      }
    }
  }
});

test("entrega ayuda simulada sin salir del backend", async () => {
  const originalProvider = process.env.AI_PROVIDER;
  process.env.AI_PROVIDER = "mock";
  try {
    const result = await service.assist({
      missionId: "mision-pmv",
      grade: 2,
      challengeId: "recorrido",
      optionId: "ruta-a-g2",
      kind: "hint",
    });
    assert.equal(result.provider, "fallback");
    assert.equal(result.reason, "mock");
    assert.ok(result.text.startsWith("Pista:"));
  } finally {
    if (originalProvider === undefined) delete process.env.AI_PROVIDER;
    else process.env.AI_PROVIDER = originalProvider;
  }
});

test("degrada a ayuda local si el ledger no está disponible y no llama al proveedor", async () => {
  const originalProvider = process.env.AI_PROVIDER;
  const originalKey = process.env.GEMINI_API_KEY;
  process.env.AI_PROVIDER = "gemini";
  process.env.GEMINI_API_KEY = "test-only-no-network";
  const serviceWithUnavailableLedger = new ContentService({
    async $executeRaw() {
      throw new Error("ledger unavailable");
    },
  });

  try {
    const result = await serviceWithUnavailableLedger.assist({
      missionId: "mision-pmv",
      grade: 3,
      challengeId: "fuentes",
      optionId: "a-primero",
      kind: "dialogue",
    });
    assert.equal(result.provider, "fallback");
    assert.equal(result.reason, "budget-unavailable");
    assert.ok(result.text.startsWith("Revisemos"));
  } finally {
    if (originalProvider === undefined) delete process.env.AI_PROVIDER;
    else process.env.AI_PROVIDER = originalProvider;
    if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalKey;
  }
});
