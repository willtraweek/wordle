import { Controller,
  HttpException, HttpStatus,
  Get,
  Param } from '@nestjs/common';
import { AppService } from './app.service';
import {Letter} from "./utilities/Letter";
import {guessResponse} from "./utilities/word";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/word")
  getWord(): string {
    //resets the game by deleting the current word
    return this.appService.getWord();
  }

  @Get("/word/:guess")
  checkGuess(@Param("guess") guess: string): object {
    // checks to see what letters the guess got correct
    try {
      return this.appService.checkGuess(guess);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: e.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
