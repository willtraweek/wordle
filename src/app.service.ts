import { Injectable } from '@nestjs/common';
import { Word } from "./utilities/word";

let word = new Word()

@Injectable()
export class AppService {
  getWord(): string {
    return word.word;
  }
}
