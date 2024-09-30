import { MAX_NUMBER, MIN_NUMBER, NUM_LENGTH } from "../const/num-range";

export class TargetNumber {
    private readonly numbers: readonly number[] = [];

    constructor(input: string) {
        const trimmedInput = input.replace(/\s/g, '');
        if (trimmedInput.length !== NUM_LENGTH) {
            throw new Error('숫자 3개를 입력해주세요');
        }

        this.numbers = trimmedInput.split('').map((cur) => {
            const curNumber = parseInt(cur);
            if (isNaN(curNumber)) {
                throw new Error('숫자를 입력해주세요');
            }
            if (curNumber < MIN_NUMBER || curNumber > MAX_NUMBER) {
                throw new Error(`${MIN_NUMBER} ~ ${MAX_NUMBER} 사이의 숫자를 입력해주세요`);
            }
            return curNumber;
        });
        this.checkDuplicate();
    }

    private checkDuplicate(): void {
        for (let i = 0; i < NUM_LENGTH - 1; i++) {
            for (let j = i + 1; j < NUM_LENGTH; j++) {
                if (this.numbers[i] === this.numbers[j]) {
                    throw new Error('중복되지 않는 숫자를 입력해주세요');
                }
            }
        }
    }

    getNumbers(): readonly number[] {
        return this.numbers;
    }
}
