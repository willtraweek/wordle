import { Controller,
  HttpException, HttpStatus,
  Get,
  Param } from '@nestjs/common';
import { AppService } from './app.service';
import {guessResponse} from "./utilities/word";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/word/reset")
  resetWord() {
    //resets the game by deleting the current word
    return {
      "message": "word reset"
    };
  }

  @Get("/word/:guess")
  checkGuess(@Param("guess") guess: string): guessResponse[] {
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
