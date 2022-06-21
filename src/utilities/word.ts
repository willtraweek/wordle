import {Letter} from "./Letter";

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

    guess(secret_word: Word) {
        // call guess.guess(secret_word) to get a response of what
        let output = Array<[string, guessResponse]>(5);

        for (let i = 0; i < WORDSIZE; i++) {
            let guess = this.letters[i];
            let answer = secret_word.letters[i];
            let guess_letter_in_word: guessResponse = guessResponse.NOT_IN_WORD;

            if (guess == answer) {
                guess_letter_in_word = guessResponse.CORRECT_POSITION;
            } else if (secret_word.letters.includes(guess)) {
                guess_letter_in_word = guessResponse.WRONG_POSITION;
            }

            output[i] = [guess.letter, guess_letter_in_word];
        }

        return output;
    }
}