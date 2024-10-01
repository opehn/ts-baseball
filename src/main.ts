import { stdin, stdout } from 'node:process';
import * as readlinePromises from 'node:readline/promises';
import { Command, CommandType } from './domain/command';
import { TargetNumberFactory } from './factory/target-number-factory';
import { GameService } from './service/game-service';
import { GameController } from './ui/Game/game-controller';
import { GamePresenter } from './ui/Game/game-presenter';

async function createReadline(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    return readlinePromises.createInterface({ input, output });
}

async function main() {
    const rl = await createReadline(stdin, stdout);
    const targetNumberFactory = new TargetNumberFactory();
    const gamePresenter = new GamePresenter();
    const gameService = GameService.getInstance(targetNumberFactory);
    const gameController = GameController.getInstance(rl, gamePresenter, gameService);

    const input = await gameController.getCommands();
    let command = new Command(input);
    while (command.getCommand() != CommandType.END_GAME) {
        switch (command.getCommand()) {
            case CommandType.START_GAME:
                await gameController.runGame();
                break;
        }
        const input = await gameController.getCommands();
        command = new Command(input);
    }
    rl.close();
}

main().catch(console.error);
