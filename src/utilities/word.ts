import {Letter} from "./Letter";
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

const WORDSIZE = 5;

export enum guessResponse {
    NOT_IN_WORD = "NOT_IN_WORD",
    WRONG_POSITION = "WRONG_POSITION",
    CORRECT_POSITION = "CORRECT_POSITION"
}

export class Word {
    private _letters = Array<Letter>(WORDSIZE);

    constructor(word: string = "") {
        if (word == "") { word = "zelus" }

        if (word.length != WORDSIZE){
            throw new Error(`Word has the wrong length -- length should be ${WORDSIZE}`)
        }

        // convert word to letters
        for (let i = 0; i < WORDSIZE; i++) {
            this._letters[i] = new Letter(word[i]);
        }

        return this;
    }

    get letters(): Letter[] {
        return this._letters;
    }

    get word(): string {
        return this._letters.join('');
    }

    guess(secret_word: Word): guessResponse[] {
        // call guess.guess(secret_word) to get a response of what
        let output = Array<guessResponse>(5);

        for (let i = 0; i < WORDSIZE; i++) {
            let guess = this.letters[i];
            let answer = secret_word.letters[i];
            let guess_letter_in_word: guessResponse = guessResponse.NOT_IN_WORD;

            if (guess.equals(answer)) {
                guess_letter_in_word = guessResponse.CORRECT_POSITION;
            } else if (secret_word.word.includes(guess.toString())) {
                guess_letter_in_word = guessResponse.WRONG_POSITION;
            }

            output[i] = guess_letter_in_word;
        }

        return output;
    }
}

@Injectable()
export class WordPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Word[] {
        let output = new Array<Word>(0);

        if(value) {
            let guesses = value.split(",")
            for (let i = 0; i < (guesses.length <= 5 ? guesses.length : 5) ; i++) {
                output.push((new Word(guesses[i])))
            }
        }

        return output;
    }
}