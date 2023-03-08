import {TIndex, TText} from "../../types/data";

export const swap = (array: TText[], index: TIndex) =>{
    const temp = array[index.start];
    array[index.start] = {letter: array[index.end].letter};
    array[index.end] = {letter: temp.letter};
}