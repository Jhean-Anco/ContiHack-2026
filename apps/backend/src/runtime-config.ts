export type RuntimeConfig = {
  port: number;
  frontendOrigin: string;
  jsonBodyLimit: string;
};

export function readRuntimeConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  const rawPort = env.PORT ?? "3001";
  const port = Number(rawPort);
  if (!/^\d+$/.test(rawPort) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT debe ser un entero entre 1 y 65535.");
  }

  const rawFrontendUrl = env.FRONTEND_URL ?? "http://localhost:3000";
  let frontendUrl: URL;
  try {
    frontendUrl = new URL(rawFrontendUrl);
  } catch {
    throw new Error("FRONTEND_URL debe ser un origen HTTP o HTTPS válido.");
  }
  if (!(["http:", "https:"].includes(frontendUrl.protocol)) || rawFrontendUrl !== frontendUrl.origin) {
    throw new Error("FRONTEND_URL debe contener solo el origen HTTP o HTTPS, sin ruta.");
  }

  return {
    port,
    frontendOrigin: frontendUrl.origin,
    jsonBodyLimit: "16kb",
  };
}
