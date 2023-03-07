export const pause = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const random = (minLen: number = 3, maxLen: number = 17): number[] => {
    let arr: number[] = [];
    let arrLength = Math.floor((Math.random())*(maxLen-minLen+1))+minLen;
    let n = 0
    while (n < arrLength) {
        arr.push(Math.floor(Math.random()*101));
        n ++
    };
    return arr;
}