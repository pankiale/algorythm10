interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    returnArray: () => Array<string | T>;
    length: number;
    head: number;
    tail: number;
}

export class Queue<T> implements IQueue<T> {
    container: Array<string | T> = [];
    head = 0;
    tail = 0;
    size: number = 0;
    length: number = 0;

    constructor(size: number, initialStack?: IQueue<T>) {
        this.size = size;
        this.container = initialStack?.returnArray()??[];
        this.length = initialStack?.length??0;
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.length++;
        this.tail++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        delete this.container[this.head % this.size];
        this.head++;
        this.length--;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size] as T;
    };

    isEmpty = () => this.length === 0;

    returnArray = () => {
        return this.container;
    };
}
