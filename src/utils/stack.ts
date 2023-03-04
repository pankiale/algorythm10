import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    returnArray: () => T[];
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container[this.getSize()] = item;
    };

    pop = (): void => {
        this.container.length = this.getSize() - 1;
    };

    peak = (): T | null => {
        if (this.getSize() > 0) {return this.container[this.getSize() - 1]}
        else return null;
    };

    getSize = () => this.container.length;

    returnArray = () => {return this.container};
}
