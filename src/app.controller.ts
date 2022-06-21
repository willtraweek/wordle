import { Controller, Render,
  HttpException, HttpStatus,
  Get,
  Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Word, guessResponse, WordPipe} from "./utilities/word";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render("index")
  playGame(@Query("guesses", new WordPipe()) guesses: Word[]) {
    return {
      message: "Hello world!",
      guesses: guesses
    }
  }

  @Get("/word/reset")
  resetWord() {
    //resets the game by deleting the current word
    this.appService.resetWord();
    return { message: "word reset" };
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
