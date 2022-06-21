import { Injectable } from '@nestjs/common';
import { Word } from "./utilities/word";

@Injectable()
export class AppService {
  getWord(): string {
    return new Word().word;
  }
}
