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
}