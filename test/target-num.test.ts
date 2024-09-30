import { MAX_NUMBER, MIN_NUMBER } from '../src/const/num-range';
import { TargetNumber } from '../src/domain/TargetNumber';

describe('TargetNum 클래스 테스트', () => {
    it('세자리 숫자로 이루어진 문자열로 새 인스턴스를 생성하면 해당 숫자로 이루어진 number 배열이 생성된다', () => {
        const testNum = new TargetNumber('123');
        const result = testNum.getNumbers();

        expect(result).toStrictEqual([1, 2, 3]);
    });

    it('입력에서 공백 문자는 무시한다', () => {
        const testNum = new TargetNumber('1 2 3');
        const result = testNum.getNumbers();

        expect(result).toStrictEqual([1, 2, 3]);
    });

    it('숫자를 3개보다 많거나 적게 입력하면 에러를 throw 한다', () => {
        expect(() => new TargetNumber('1234')).toThrow('숫자 3개를 입력해주세요');
        expect(() => new TargetNumber('12')).toThrow('숫자 3개를 입력해주세요');
    });

    it('숫자가 아닌 문자열이 있으면 에러를 throw 한다', () => {
        expect(() => new TargetNumber('1a3')).toThrow('숫자를 입력해주세요');
    });

    it(`${MIN_NUMBER} ~ ${MAX_NUMBER} 범위를 넘어가는 숫자가 있으면 에러를 throw 한다.`, () => {
        expect(() => new TargetNumber('012')).toThrow(`${MIN_NUMBER} ~ ${MAX_NUMBER} 사이의 숫자를 입력해주세요`);
    });

    it('중복되는 숫자가 있으면 에러를 throw 한다', () => {
        expect(() => new TargetNumber('112')).toThrow('중복되지 않는 숫자를 입력해주세요');
    });
});
