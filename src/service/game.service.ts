import { NUM_LENGTH } from '../const/num-range';
import { GameNumber } from '../domain/game-number.model';
import { ResultResponse } from '../dto/result-response.dto';
import { ResultService } from './result.service';

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
        showResultCallback: (result: ResultResponse) => void,
    ): Promise<void> {
        const guessNumber = await getNumbersCallback();

        const resultService = new ResultService(targetNumber, guessNumber);
        let result = resultService.getResult();
        showResultCallback(result);

        while (result.strike !== NUM_LENGTH) {
            const guessNumber = await getNumbersCallback();

            const resultService = new ResultService(targetNumber, guessNumber);
            result = resultService.getResult();
            showResultCallback(result);
        }
    }
}
