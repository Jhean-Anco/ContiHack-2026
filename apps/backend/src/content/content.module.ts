import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma.module.js";
import { ContentController } from "./content.controller.js";
import { ContentService } from "./content.service.js";

@Module({ imports: [PrismaModule], controllers: [ContentController], providers: [ContentService] })
export class ContentModule {}
