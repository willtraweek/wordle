import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/word")
  getWord(): string {
    //resets the game by deleting the current word
    return this.appService.getWord();
  }
}
