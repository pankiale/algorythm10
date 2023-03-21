import {ElementStates} from "../../types/element-states";
import {TNumber} from "../../types/data";
import {swap} from "./utils";


let emptyArrayStub = [] as unknown as TNumber[];
let expectedEmptyArray = [] as unknown as TNumber[];
let oneElementArrayStub: TNumber[] = [{item: 1, state: ElementStates.Default}];
let expectedOneElementArray: TNumber[] = [{item: 1, state: ElementStates.Default}];
let arrayStub = [
    {item: 18, state: ElementStates.Default},
    {item: 35, state: ElementStates.Default},
    {item: 26, state: ElementStates.Default},
    {item: 7, state: ElementStates.Default},
];
let expectedArray = [
    {item: 35, state: ElementStates.Default},
    {item: 26, state: ElementStates.Default},
    {item: 18, state: ElementStates.Default},
    {item: 7, state: ElementStates.Default},
];
beforeEach(() => {
    emptyArrayStub = [];
    oneElementArrayStub = [{item: 1, state: ElementStates.Default}];
    arrayStub = [
        {item: 18, state: ElementStates.Default},
        {item: 35, state: ElementStates.Default},
        {item: 26, state: ElementStates.Default},
        {item: 7, state: ElementStates.Default},
    ];
})

describe("bubble sorting tests", () => {
    it("empty array bubble sort", () => {
        for (let i = 0; i < emptyArrayStub.length; i++) {
            for (let j = 0; j < emptyArrayStub.length - i - 1; j++) {
                emptyArrayStub[j].state = ElementStates.Changing;
                if (emptyArrayStub[j].item < emptyArrayStub[j + 1]?.item) {
                    swap(emptyArrayStub, j, j + 1)
                }
            }
        }
        expect(emptyArrayStub).toStrictEqual(expectedEmptyArray);
    })
    it("one element array bubble sort", () => {
        for (let i = 0; i < oneElementArrayStub.length; i++) {
            for (let j = 0; j < oneElementArrayStub.length - i - 1; j++) {
                oneElementArrayStub[j].state = ElementStates.Changing;
                if (oneElementArrayStub[j].item < oneElementArrayStub[j + 1]?.item) {
                    swap(oneElementArrayStub, j, j + 1)
                }
            }
        }
        expect(oneElementArrayStub).toStrictEqual(expectedOneElementArray);
    })
    it("array bubble sort", () => {
        for (let i = 0; i < arrayStub.length; i++) {
            for (let j = 0; j < arrayStub.length - i - 1; j++) {
                if (arrayStub[j].item < arrayStub[j + 1]?.item) {
                    swap(arrayStub, j, j + 1)
                }
            }
        }
        expect(arrayStub).toStrictEqual(expectedArray);
    })
});

describe("selection sorting tests", () => {
    it("empty array selection sort", () => {
        for (let i = 0; i < emptyArrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < emptyArrayStub.length; j++) {
                if (emptyArrayStub[min].item < emptyArrayStub[j].item) {
                    min = j;
                }
            }
            if (min != i) {
                swap(emptyArrayStub, i, min);
            }
        }
        expect(emptyArrayStub).toStrictEqual(expectedEmptyArray);
    })
    it("one element array selection sort", () => {
        for (let i = 0; i < oneElementArrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < oneElementArrayStub.length; j++) {
                if (oneElementArrayStub[min].item < oneElementArrayStub[j].item) {
                    min = j;
                }
            }
            if (min != i) {
                swap(oneElementArrayStub, i, min);
            }
        }
        expect(oneElementArrayStub).toStrictEqual(expectedOneElementArray);
    })
    it("array selection sort", () => {
        for (let i = 0; i < arrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < arrayStub.length; j++) {
                if (arrayStub[min].item < arrayStub[j].item) {
                    min = j;
                }
            }
            if (min != i) {
                swap(arrayStub, i, min);
            }
        }
        expect(arrayStub).toStrictEqual(expectedArray);
    })
})