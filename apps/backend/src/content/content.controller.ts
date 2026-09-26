import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ContentService } from "./content.service.js";

@Controller()
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get("content/manifest")
  getManifest() {
    return this.content.getManifest();
  }

  @Get("content/missions/:id")
  getMission(@Param("id") id: string, @Query("grade") grade?: string) {
    return this.content.getMission(id, grade);
  }

  @Post("game/answer")
  @HttpCode(HttpStatus.OK)
  answer(@Body() payload: unknown) {
    return this.content.answer(payload);
  }

  @Post("game/assistance")
  @HttpCode(HttpStatus.OK)
  assist(@Body() payload: unknown) {
    return this.content.assist(payload);
  }
}
