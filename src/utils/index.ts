import {useState} from "react";

export const pause = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}