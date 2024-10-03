import * as readlinePromises from 'readline/promises';
import { GameNumber } from '../../domain/game-number.model';
import { GameService } from '../../service/game.service';
import { GamePresenter } from './game.presenter';

export class GameController {
    private static instance: GameController;
    constructor(
        private readonly rl: readlinePromises.Interface,
        private readonly gamePresenter: GamePresenter,
        private readonly gameService: GameService,
    ) {}

    static getInstance(rl: readlinePromises.Interface, gamePresenter: GamePresenter, gameService: GameService) {
        if (!GameController.instance) {
            GameController.instance = new GameController(rl, gamePresenter, gameService);
        }
        return GameController.instance;
    }

    async runGame() {
        const targetNumber = GameNumber.createRandom();
        this.gamePresenter.showNumberSet();

        await this.gameService.playGame(
            targetNumber,
            this.getGuessNumber.bind(this),
            this.gamePresenter.showResult.bind(this.gamePresenter),
        );

        this.gamePresenter.showGameEnd();
    }

    async getGuessNumber(): Promise<GameNumber> {
        const input = await this.getNumbers();
        return GameNumber.from(input);
    }

    async getCommands(): Promise<string> {
        this.gamePresenter.showMenu();
        return await this.rl.question('');
    }

    async getNumbers(): Promise<string> {
        this.gamePresenter.showInputNumber();
        return await this.rl.question('');
    }
}
