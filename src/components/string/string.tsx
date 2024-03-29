import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {TIndex, TText} from "../../types/data";
import {swap} from "./utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {
    const [rotatedString, setRotatedString] = useState<TText[]>([]);
    const [index, setIndex] = useState<TIndex>({start: 0, end: 0});
    const [isLoader, setIsLoader] = useState(false);

    const createArrayForSort = (form: string) => {
        const text = form.split('');
        const result: TText[] = [];
        for (let i = 0; i < text.length; i++) {
            result[i] = {letter: text[i], state: ElementStates.Default}
        }
        setRotatedString(result);
    }

    useEffect(()=>{
        if (!isLoader) {
            setIndex({start: 0, end: 0});
        }
    }, [isLoader]);

    useEffect(() => {
        if (isLoader && rotatedString.length > 0) {
            const intervalId = setInterval(() => {
                if (index.start > index.end) {
                    setIsLoader(false);
                    return () => clearInterval(intervalId);
                }
                setRotatedString(prevString => {
                    const updatedString = [...prevString];
                    updatedString[index.start].state = ElementStates.Changing;
                    updatedString[index.end].state = ElementStates.Changing;
                    return updatedString;
                });

                setTimeout(()=> {
                    setRotatedString(prevString => {
                        const updatedString = [...prevString];
                        swap(updatedString,index);
                        updatedString[index.start] = {...updatedString[index.start], state: ElementStates.Modified};
                        updatedString[index.end] = {...updatedString[index.end], state: ElementStates.Modified};
                        return updatedString;
                    })
                }, SHORT_DELAY_IN_MS)

                setIndex({... index, start: index.start + 1, end: index.end -1});
            }, SHORT_DELAY_IN_MS);
            return () => clearInterval(intervalId);
        }
    }, [rotatedString, index]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.item(0) as HTMLInputElement;
        if (input.value.length === 0) return alert('Введите текст');
        createArrayForSort(input.value);
        setIsLoader(true);
        setIndex({...index, end: input.value.length -1});
    }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.box} onSubmit={onSubmit} >
        <Input maxLength={11} name={'text'} isLimitText={true} />
        <Button text={'Развернуть'} type={"submit"} extraClass={styles.button} isLoader={isLoader}/>
      </form>
        <div className={styles.textbox}>
            {rotatedString && rotatedString.map((item,index) => <Circle letter={item.letter} state={item.state} key = {index}/>
            )}
        </div>
    </SolutionLayout>
  );
};
