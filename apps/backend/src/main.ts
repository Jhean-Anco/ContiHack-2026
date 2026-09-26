import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module.js";
import { readRuntimeConfig } from "./runtime-config.js";

async function bootstrap() {
  const config = readRuntimeConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.useBodyParser("json", { limit: config.jsonBodyLimit });
  app.enableCors({
    origin: config.frontendOrigin,
    methods: ["GET", "HEAD", "POST", "OPTIONS"],
    allowedHeaders: ["Accept", "Content-Type"],
  });
  app.enableShutdownHooks();
  app.getHttpAdapter().getInstance().disable("x-powered-by");
  await app.listen(config.port, "0.0.0.0");
}

void bootstrap();
