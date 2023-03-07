import {ElementStates} from "../types/element-states";

class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList<T> {
    head: ListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    static fromArray<T>(arr: T[]): LinkedList<T> {
        const list = new LinkedList<T>();
        for (const val of arr) {
            list.add(val);
        }
        return list;
    }

    // Add element to the end of the list
    add(data: T): void {
        const newNode = new ListNode(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    addToTail(data: T): void {
        const newNode = new ListNode<T>(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        this.size++;
    }

    // Insert element at a given position
    insertAt(data: T, position: number): boolean {
        if (position < 0 || position > this.size) {
            return false;
        }
        const newNode = new ListNode(data);
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;
        if (position === 0) {
            newNode.next = current;
            this.head = newNode;
        } else {
            while (index < position) {
                previous = current;
                current = current!.next;
                index++;
            }
            newNode.next = current;
            previous!.next = newNode;
        }
        this.size++;
        return true;
    }

    // Remove element from a given position
    removeFrom(position: number): T | null {
        if (position < 0 || position >= this.size) {
            return null;
        }
        let current = this.head;
        let previous: ListNode<T> | null = null;
        let index = 0;
        if (position === 0) {
            this.head = current!.next;
        } else {
            while (index < position) {
                previous = current;
                current = current!.next!;
                index++;
            }
            previous!.next = current!.next;
        }
        this.size--;
        return current!.data;
    }

    // Remove element with given value
    removeElement(data: T): T | null {
        let current = this.head;
        let previous: ListNode<T> | null = null;
        while (current !== null) {
            if (current.data === data) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }

    // Get the element at a given position
    get(position: number): T | null {
        if (position < 0 || position >= this.size) {
            return null;
        }
        let current = this.head;
        let index = 0;
        while (index < position) {
            current = current!.next!;
            index++;
        }
        return current!.data;
    }

    // Get the index of an element with given value
    indexOf(data: T): number {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    // Check if the list is empty
    isEmpty(): boolean {
        return this.size === 0;
    }

// Get the size of the list
    public getSize(): number {
        return this.size;
    }

    public print(): { element: T, elementState: ElementStates, index: number, isHead: boolean, isTail: boolean }[] {
        let current = this.head;
        const elements: { element: T, elementState: ElementStates, index: number, isHead: boolean, isTail: boolean }[] = [];
        let index = 0;
        while (current !== null) {
            elements.push({
                element: current.data,
                elementState: ElementStates.Default,
                index,
                isHead: current === this.head,
                isTail: current.next === null
            });
            current = current.next;
            index++;
        }
        return elements;
    }
}
