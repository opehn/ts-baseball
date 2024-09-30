import { stdin, stdout } from 'node:process';
import * as readlinePromises from 'node:readline/promises';
import { END_GAME, START_GAME } from './const/command';

export async function getInput(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    const rl = readlinePromises.createInterface({ input, output });
    try {
        while (1) {
            const answer = await rl.question('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.');
            const answerNum = parseInt(answer);
            if (isNaN(answerNum)) {
                throw new Error(`숫자를 입력해주세요`);
            }

            switch (answerNum) {
                case START_GAME:
                    console.log('1 입력');
                    break;
                case END_GAME:
                    console.log('9 입력');
                    break;
                default:
                    console.log('존재하지 않는 옵션입니다');
                    break;
            }
        }
    } catch (e) {
        console.error('오류 발생:', (e as Error).message);
    } finally {
        rl.close();
    }
}

getInput(stdin, stdout);
