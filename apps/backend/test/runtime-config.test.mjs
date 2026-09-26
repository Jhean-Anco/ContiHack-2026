import assert from "node:assert/strict";
import { test } from "node:test";

import { readRuntimeConfig } from "../dist/src/runtime-config.js";

test("usa valores locales predeterminados y limita cuerpos JSON", () => {
  assert.deepEqual(readRuntimeConfig({}), {
    port: 3001,
    frontendOrigin: "http://localhost:3000",
    jsonBodyLimit: "16kb",
  });
});

test("acepta un puerto y origen HTTP configurados", () => {
  assert.deepEqual(readRuntimeConfig({ PORT: "3100", FRONTEND_URL: "https://juego.example" }), {
    port: 3100,
    frontendOrigin: "https://juego.example",
    jsonBodyLimit: "16kb",
  });
});

test("rechaza puerto fuera de rango y URL con ruta", () => {
  assert.throws(() => readRuntimeConfig({ PORT: "0" }), /PORT/);
  assert.throws(() => readRuntimeConfig({ PORT: "65536" }), /PORT/);
  assert.throws(() => readRuntimeConfig({ PORT: "3001x" }), /PORT/);
  assert.throws(() => readRuntimeConfig({ FRONTEND_URL: "http://localhost:3000/jugar" }), /FRONTEND_URL/);
  assert.throws(() => readRuntimeConfig({ FRONTEND_URL: "file:///tmp" }), /FRONTEND_URL/);
});
