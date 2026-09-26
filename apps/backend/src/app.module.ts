import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller.js";
import { PrismaModule } from "./prisma.module.js";
import { ContentModule } from "./content/content.module.js";

@Module({
  imports: [PrismaModule, ContentModule],
  controllers: [HealthController],
})
export class AppModule {}
