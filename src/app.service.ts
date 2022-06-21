import { Injectable } from '@nestjs/common';
import { Word, guessResponse } from "./utilities/word";

let word = new Word();

@Injectable()
export class AppService {
  getWord(): string {
    return word.word;
  }

  checkGuess(guess: string) : guessResponse[] {
    let guess_word = new Word(guess);
    return guess_word.guess(word)
  }
}
