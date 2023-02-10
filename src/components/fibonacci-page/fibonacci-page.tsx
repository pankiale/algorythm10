import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {pause} from "../../utils";

export const FibonacciPage: React.FC = () => {

  const [number, setNumber] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [array, setArray] = useState<number[]>([]);
console.log(number)
  console.log(array)
  const fib = (n: number): number[] => {
    let arr: number[] = [0,1];
    if (n === 0) return [0];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
    return arr;
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Number(((e.currentTarget.elements.item(0) as HTMLInputElement)).value);
      setNumber(fib(value));
      setIsLoader(true);
      plotArray(number);
  }

  const plotArray = async (input: number[]) => {
    for (let i = 0; i < input.length; i++) {
      setArray([1,2,3]
      //     oldValue =>  {
      //   const newValue = [...oldValue];
      //   console.log(newValue)
      //   newValue[i] = input[i];
      //   return newValue;
      // }
      );
      console.log(array)
      await pause(500);
    };
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <form className={styles.box} onSubmit={onSubmit} >
        <Input type={'number'} min={1} max={19} name={'number'} isLimitText={true}/>
        <Button text={'Рассчитать'} type={"submit"} extraClass={styles.button} isLoader={isLoader}/>
      </form>
      <div className={styles.textbox}>
        {array.map((item, index) =>
            <Circle letter={String(item)} index={index} key={index}/>
        )}
      </div>
    </SolutionLayout>
  );
};
