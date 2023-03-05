interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    public container: (T | null)[] = [];
    public head = 0;
    public tail = 0;
    public readonly size: number = 0;
    public length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.length ++;
        this.tail ++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        delete this.container[this.head % this.size];
        this.head ++;
        this.length --;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size];
    };

    isEmpty = () => this.length === 0;

    getHead = (): number => this.head;

    getTail = (): number => this.tail;

    getLength = (): number => this.length;

    getContainer = (): (T | null)[] => this.container;
}
