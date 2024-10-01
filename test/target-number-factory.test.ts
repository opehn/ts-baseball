import { NUM_LENGTH } from '../src/const/num-range';
import { TargetNumberFactory } from '../src/factory/target-number-factory';

describe('TargetNumberFactory 클래스 테스트', () => {
    let factory: TargetNumberFactory;
    beforeEach(() => {
        factory = new TargetNumberFactory();
    });

    describe('TargetNumber 생성', () => {
        it(`생성한 TargetNumber 클래스의 numbers 변수의 길이가 ${NUM_LENGTH}여야 한다`, () => {
            const instance = factory.generateTargetNumber();
            expect(instance.getNumbers().length).toBe(NUM_LENGTH);
        });

        it(`중복된 숫자를 만들지 않는다`, () => {
            for (let i = 0; i < 100; i++) {
                const instance = factory.generateTargetNumber();
                const numbers = instance.getNumbers();
                const result = new Set();
                for (let j = 0; j < numbers.length; j++) {
                    result.add(numbers[j]);
                }

                expect(result.size).toEqual(numbers.length);
            }
        });
    });
});
