export class Letter {
    readonly letter: string;
    constructor(letter: string) {
        if(letter.length !== 1) {
            throw new Error(letter + " is not a single character");
        }

        if(!/[a-zA-Z]/.test(letter)) {
            throw new Error(letter + "is not a letter")
        }

        this.letter = letter;
    }

    public equals(obj: Letter): boolean {
        return this.letter === obj.letter;
    }

    toString(): string {
        return this.letter;
    }
}