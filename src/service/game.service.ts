import { NUM_LENGTH } from '../const/num-range';
import { GameNumber } from '../domain/game-number.model';
export interface Result {
    strike: number;
    ball: number;
}

export class GameService {
    private static instance: GameService;

    constructor() {}

    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    async playGame(
        targetNumber: GameNumber,
        getNumbersCallback: () => Promise<GameNumber>,
        showResultCallback: (result: Result) => void,
    ): Promise<void> {
        const guessNumber = await getNumbersCallback();

        let result = this.compareNumbers(targetNumber, guessNumber);
        showResultCallback(result);

        while (result.strike !== NUM_LENGTH) {
            const guessNumber = await getNumbersCallback();

            result = this.compareNumbers(targetNumber, guessNumber);
            showResultCallback(result);
        }
    }

    private compareNumbers(targetNumber: GameNumber, guessNumber: GameNumber): Result {
        let strike = 0;
        let ball = 0;

        const target = targetNumber.getNumbers();
        const guess = guessNumber.getNumbers();

        for (let i = 0; i < target.length; i++) {
            if (target[i] === guess[i]) {
                strike++;
            } else if (target.includes(guess[i])) {
                ball++;
            }
        }
        return { strike, ball };
    }

    testCompareNumbers(targetNumber: GameNumber, guessNumber: GameNumber): Result {
        return this.compareNumbers(targetNumber, guessNumber);
    }
}
