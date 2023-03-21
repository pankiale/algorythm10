import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {fib} from "./utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [number, setNumber] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [array, setArray] = useState<number[]>([]);

  const clearForRerender = () => {
    setArray(() => {
      return [];
    });
    setIndex(() => {
      return 0;
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = ((e.currentTarget.elements.item(0) as HTMLInputElement)).value;
    if (value.length === 0) return alert('Введите число от 1 до 19');
    setNumber(oldValue => {const newValue = [...oldValue]; return fib(Number(value))});
    setIsLoader(true);
    clearForRerender();
  }

  useEffect(()=> {
    if (number.length > 0) {

      const timeout = setTimeout(() => {
        setArray(
            oldValue => {
              const newValue = [...oldValue];
              newValue.push(number[index]);
              setIndex(index +1);
              return newValue;
            });

      }, SHORT_DELAY_IN_MS)
      if (index === number.length) {
        setIsLoader(false);
        return clearTimeout(timeout)};
    };
  }, [number, array]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <form className={styles.box} onSubmit={onSubmit} >
        <Input type={'number'} min={1} max={19} name={'number'} isLimitText={true}/>
        <Button text={'Рассчитать'} type={"submit"} extraClass={styles.button} isLoader={isLoader}/>
      </form>
      <div className={styles.textbox}>
        {array && array.map((item, index) =>
            <Circle letter={String(item)} index={index} key={index}/>
        )}
      </div>
    </SolutionLayout>
  );
};
