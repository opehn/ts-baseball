export class Command {
    private readonly command: number;

    constructor(input: string) {
        const inputNumber = parseInt(input);
        if (isNaN(inputNumber)) {
            throw new Error('숫자를 입력해주세요');
        }
        this.command = inputNumber;
    }

    getCommand() {
        return this.command;
    }
}
