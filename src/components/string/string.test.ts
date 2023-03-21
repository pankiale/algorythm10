import {swap} from "./utils";
import {ElementStates} from "../../types/element-states";
import {TText} from "../../types/data";

describe("string test", () => {
    it('string even number of letters', () => {
        const evenStringStub = [
            {letter: 'с', state: ElementStates.Default},
            {letter: 'т', state: ElementStates.Default},
            {letter: 'р', state: ElementStates.Default},
            {letter: 'о', state: ElementStates.Default},
            {letter: 'к', state: ElementStates.Default},
            {letter: 'а', state: ElementStates.Default}
        ]
        const expectedEvenValue =  [
            { letter: 'а', state: ElementStates.Default },
            { letter: 'к', state: ElementStates.Default },
            { letter: 'о', state: ElementStates.Default },
            { letter: 'р', state: ElementStates.Default },
            { letter: 'т', state: ElementStates.Default },
            { letter: 'с', state: ElementStates.Default }
        ]

        for (let i = 0, k = evenStringStub.length - 1; i <= k; i++, k--) {
            swap(evenStringStub, {start: i, end: k});
        }
        expect(evenStringStub).toStrictEqual(expectedEvenValue);
    })
    it('string odd num of letters', () => {
        const oddStringStub = [
            {letter: 'с', state: ElementStates.Default},
            {letter: 'т', state: ElementStates.Default},
            {letter: 'р', state: ElementStates.Default},
            {letter: 'о', state: ElementStates.Default},
            {letter: 'к', state: ElementStates.Default},
        ]
        const expectedOddValue =  [
            { letter: 'к', state: ElementStates.Default },
            { letter: 'о', state: ElementStates.Default },
            { letter: 'р', state: ElementStates.Default },
            { letter: 'т', state: ElementStates.Default },
            { letter: 'с', state: ElementStates.Default },
        ]

        for (let i = 0, k = oddStringStub.length - 1; i <= k; i++, k--) {
            swap(oddStringStub, {start: i, end: k});
        }
        expect(oddStringStub).toStrictEqual(expectedOddValue);
    })
    it('string one letter', () => {
        const oneLetterStub = [
            {letter: 'х', state: ElementStates.Default},
        ]
        const expectedOneLetterValue =  [
            { letter: 'х', state: ElementStates.Default },
        ]

        for (let i = 0, k = oneLetterStub.length - 1; i <= k; i++, k--) {
            swap(oneLetterStub, {start: i, end: k});
        }
        expect(oneLetterStub).toStrictEqual(expectedOneLetterValue);
    })
    it('string empty', () => {
        const oddStringStub = [] as unknown as TText[]
        const expectedOddValue =  [] as unknown as TText[]

        for (let i = 0, k = oddStringStub.length - 1; i <= k; i++, k--) {
            swap(oddStringStub, {start: i, end: k});
        }
        expect(oddStringStub).toStrictEqual(expectedOddValue);
    })
})