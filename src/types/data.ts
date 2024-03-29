import {ElementStates} from "./element-states";

export type TText = {
    letter: string;
    state?: ElementStates;
};

export type TNumber = {
    item: number;
    state: ElementStates;
};


export type TIndex = {
    start: number;
    end: number;
};
