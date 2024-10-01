import { NUM_LENGTH } from '../const/num-range';
import { TargetNumber } from '../domain/TargetNumber';
import { TargetNumberFactory } from '../factory/target-number-factory';
export interface Result {
    strike: number;
    ball: number;
}

export class GameService {
    private static instance: GameService;

    constructor(private readonly targetNumberFactory: TargetNumberFactory) {}

    public static getInstance(targetNumberFactory: TargetNumberFactory): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService(targetNumberFactory);
        }
        return GameService.instance;
    }

    async playGame(
        getNumbersCallback: () => Promise<TargetNumber>,
        showResultCallback: (result: Result) => void,
    ): Promise<void> {
        const targetNumber = this.targetNumberFactory.generateTargetNumber();
        const guessNumber = await getNumbersCallback();

        let result = this.compareNumbers(targetNumber, guessNumber);
        showResultCallback(result);

        while (result.strike !== NUM_LENGTH) {
            const guessNumber = await getNumbersCallback();

            result = this.compareNumbers(targetNumber, guessNumber);
            showResultCallback(result);
        }
    }

    private compareNumbers(targetNumber: TargetNumber, guessNumber: TargetNumber): Result {
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

    testCompareNumbers(targetNumber: TargetNumber, guessNumber: TargetNumber): Result {
        return this.compareNumbers(targetNumber, guessNumber);
    }
}
