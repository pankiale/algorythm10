import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {TIndex, TText} from "../../types/data";

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
                        updatedString[index.start] = {letter: updatedString[index.end].letter, state: ElementStates.Modified};
                        updatedString[index.end] = {letter: prevString[index.start].letter, state: ElementStates.Modified};
                        return updatedString;
                    })
                }, 1000)

                setIndex({... index, start: index.start + 1, end: index.end -1});
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [rotatedString, index]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.item(0) as HTMLInputElement;
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
