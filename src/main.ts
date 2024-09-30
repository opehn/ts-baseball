import { stdin, stdout } from 'node:process';
import * as readlinePromises from 'node:readline/promises';
import { END_GAME, START_GAME } from './const/command';
import { Command } from './domain/Command';

function executeCommand(command: Command) {
    switch (command.getCommand()) {
        case START_GAME:
            console.log('1 입력');
            return 1;
        case END_GAME:
            console.log('애플리케이션이 종료되었습니다.');
            return 0;
        default:
            console.log('존재하지 않는 옵션입니다');
            return 1;
    }
}

async function run(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    const rl = readlinePromises.createInterface({ input, output });
    let flag = 1;
    try {
        while (flag) {
            const answer = await rl.question(`게임을 새로 시작하려면 ${START_GAME}, 종료하려면 ${END_GAME}를 입력하세요.\n`);
            const command = new Command(answer);
            flag = executeCommand(command);
        }
    } catch (e) {
        console.error('오류 발생:', (e as Error).message);
    } finally {
        rl.close();
    }
}

run(stdin, stdout);
