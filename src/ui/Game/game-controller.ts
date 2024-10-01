import * as readlinePromises from 'readline/promises';
import { TargetNumber } from '../../domain/TargetNumber';
import { TargetNumberFactory } from '../../domain/TargetNumberFactory';
import { GamePresenter } from './game-presenter';

export class GameController {
    constructor(
        private readonly rl: readlinePromises.Interface,
        private readonly gamePresenter: GamePresenter, //private readonly gameService: GameService,
    ) {}
    async startGame() {
        const targetNumberFactory = new TargetNumberFactory();
        const targetNumber = targetNumberFactory.generateTargetNumber();
        this.gamePresenter.showNumberSet();
        const input = await this.getNumbers();
        const guessNumber = new TargetNumber(input);
        //게임 진행 로직
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
