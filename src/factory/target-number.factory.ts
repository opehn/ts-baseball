import { MAX_NUMBER, MIN_NUMBER, NUM_LENGTH } from '../const/num-range';
import { TargetNumber } from '../domain/target-number.model';

export class TargetNumberFactory {
    private shuffle(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generateTargetNumber() {
        const numbers = Array.from({ length: MAX_NUMBER - MIN_NUMBER + 1 }, (_, i) => i + MIN_NUMBER);
        const shuffled = this.shuffle(numbers);
        const targetNumberString = shuffled.slice(0, NUM_LENGTH).join('');

        return new TargetNumber(targetNumberString);
    }
}
