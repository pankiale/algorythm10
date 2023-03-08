import {TNumber} from "../../types/data";

export const swap = (arr: TNumber[], i: number, j: number) => {
    let temp = arr[i]
    arr[i] = arr[j];
    arr[j] = temp;
}