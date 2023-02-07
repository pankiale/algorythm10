import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {TText} from "../../types/data";
import {pause, useForceUpdate} from "../../utils";

export const StringComponent: React.FC = () => {
    const [form, setValue] = useState ('');
    const [text, setText] = useState <TText[]>([]);
    const [isLoader, setIsLoader] = useState(false);
    const [sort, setSort] = useState(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        console.log(form);
    };
    const forceUpdate = useForceUpdate();
    const createArrayForSort = (form: string) => {
        const text = form.split('');
        const result: TText[] = [];
        for (let i = 0; i < text.length; i++) {
            result[i] = {letter: text[i], state: ElementStates.Default }
        };
        setText(result);
        setSort(true);
    }

        const sortArray = async (array: TText[]) => {
            let end = array.length - 1;

            for (let i = 0; i <= end; i++) {
                await setText(text => text.map((item,index) => {
                        if (index === end) {
                            return { ...item, state:ElementStates.Changing };
                        }
                        return item;
                    })
                );
                forceUpdate();
                console.log(end)
                console.log(text);
                end --;
            };
        }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoader(true);
        createArrayForSort(form);
        sortArray(text);
        setValue('');
    }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.box} onSubmit={onSubmit} >
        <Input maxLength={11} name={'text'} isLimitText={true} onChange={onChange} />
        <Button text={'Развернуть'} type={"submit"} extraClass={styles.button} isLoader={isLoader}/>
      </form>
        <div className={styles.textbox}>
            {text && text.map((item,index) => <Circle letter={item.letter} state={item.state} key = {index}/>
            )}
        </div>
    </SolutionLayout>
  );
};
