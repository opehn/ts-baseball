import { stdin, stdout } from 'node:process';
import * as readlinePromises from 'node:readline/promises';
import { Command, CommandType } from './domain/Command';
import { GameController } from './ui/Game/game-controller';
import { GamePresenter } from './ui/Game/game-presenter';

async function createReadline(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    return readlinePromises.createInterface({ input, output });
}

async function main() {
    const rl = await createReadline(stdin, stdout);
    const gamePresenter = new GamePresenter();
    const gameController = new GameController(rl, gamePresenter);

    const input = await gameController.getCommands();
    let command = new Command(input);
    console.log('command:', command.getCommand());
    while (command.getCommand() != CommandType.END_GAME) {
        switch (command.getCommand()) {
            case CommandType.START_GAME:
                await gameController.startGame();
                break;
        }
        const input = await gameController.getCommands();
        command = new Command(input);
    }
    rl.close();
}

main().catch(console.error);
