import {Letter} from "./Letter";

export class Word {
    private _letters = Array<Letter>(5);

    constructor(word: string = "") {
        if (word == "") { word = "zelus" }

        if (word.length != 5){
            throw new Error("Word has the wrong length")
        }

        // convert word to letters
        for (let i = 0; i < 5; i++) {
            this._letters[i] = new Letter(word[i]);
        }

        return this;
    }

    get letters(): Letter[] {
        return this._letters;
    }

    get word(): string {
        return this._letters.join('')
    }
}