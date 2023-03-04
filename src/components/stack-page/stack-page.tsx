import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Stack} from "../../utils/stack";
import styles from "../stack-page/stack.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {TText} from "../../types/data";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";

export const StackPage: React.FC = () => {

    const [stack, setStack] = useState(new Stack<TText>());
    const [value, setValue] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.length) return alert("Введите текст");
        setIsLoader(true);

        const newStack = new Stack<TText>([...stack.returnArray()]);
        newStack.push({letter: value, state: ElementStates.Changing});
        setStack(newStack);

        setTimeout(() => {
            const updatedStack = new Stack<TText>([...newStack.returnArray()]);
            const topElement = updatedStack.peak()
            if (topElement?.state) topElement.state = ElementStates.Default;
            setStack(updatedStack)
            setValue("");
            setIsLoader(false);
        }, 500);
    };

    const onDelete = () => {
        setIsLoader(true);
        const newStack = new Stack<TText>([...stack.returnArray()]);
        const topElement = newStack.peak()
        if (topElement?.state) topElement.state = ElementStates.Changing;
        setStack(newStack);

        setTimeout(() => {
            const updatedStack = new Stack<TText>([...newStack.returnArray()]);
            updatedStack.pop();
            setStack(updatedStack);
            setIsLoader(false);
        }, 500);
    }

    const onClear = () => {
        const newStack = new Stack<TText>();
        setStack(newStack);
    }

    return (
        <SolutionLayout title="Стек">
            <form className={styles.box} onSubmit={onSubmit}>
                <Input maxLength={4} name={'text'} value={value} isLimitText={true} onChange={onChange}/>
                <Button text={'Добавить'} type={"submit"} extraClass={styles.button} isLoader={isLoader}
                        disabled={!value.length ? true : false}/>
                <Button text={'Удалить'} onClick={onDelete} extraClass={styles.button} isLoader={isLoader}
                        disabled={stack.getSize() === 0 ? true : false}/>
                <Button text={'Очистить'} onClick={onClear} extraClass={`${styles.button} ${styles.button_clear}`}
                        isLoader={isLoader} disabled={stack.getSize() === 0 ? true : false}/>
            </form>
            <div className={styles.textbox}>
                {stack.returnArray().map((item, index) => <Circle
                    head={index === stack.container.length - 1 ? 'head' : null} index={index} letter={item.letter}
                    state={item.state} key={index}/>
                )}
            </div>
        </SolutionLayout>
    );
};
