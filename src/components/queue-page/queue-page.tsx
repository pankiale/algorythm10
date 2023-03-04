import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Stack} from "../../utils/stack";
import {TText} from "../../types/data";
import {ElementStates} from "../../types/element-states";
import styles from "../stack-page/stack.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Queue} from "../../utils/queue";

export const QueuePage: React.FC = () => {

    const [stack, setStack] = useState(new Queue<TText>(7));
    const [value, setValue] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    console.log(stack.container)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.length) return alert("Введите текст");
        setIsLoader(true);

        const newStack = new Queue<TText>(7, stack);
        newStack.length = stack.length;
        newStack.head = stack.head;
        newStack.tail = stack.tail;
        newStack.enqueue({letter: value, state: ElementStates.Changing});

        setTimeout(() => {
            const updatedStack = new Queue<TText>(7, newStack);
            updatedStack.length = newStack.length;
            updatedStack.head = newStack.head;
            updatedStack.tail = newStack.tail;

            const topElement = updatedStack.peak()
            if (topElement?.state) topElement.state = ElementStates.Default;
            setStack(updatedStack)
            setValue("");
            setIsLoader(false);
        }, 500);
    };


    const onDelete = () => {
        setIsLoader(true);
        // const newStack = new Queue<TText>(7, [...stack.returnArray() as TText[]]);
        // const topElement = newStack.peak()
        // if (topElement?.state) topElement.state = ElementStates.Changing;
        // setStack(newStack);
        //
        // setTimeout(() => {
        //     const updatedStack = new Queue<TText>(7, [...newStack.returnArray() as TText[]]);
        //     updatedStack.dequeue();
        //     setStack(updatedStack);
        //     setIsLoader(false);
        // }, 500);
    }

    const onClear = () => {
        const newStack = new Queue<TText>(7);
        setStack(newStack);
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={styles.box} onSubmit={onSubmit}>
                <Input maxLength={4} name={'text'} value={value} isLimitText={true} onChange={onChange}/>
                <Button text={'Добавить'} type={"submit"} extraClass={styles.button} isLoader={isLoader}
                        disabled={!value.length ? true : false}/>
                <Button text={'Удалить'} onClick={onDelete} extraClass={styles.button} isLoader={isLoader}
                        disabled={stack.size === 0 ? true : false}/>
                <Button text={'Очистить'} onClick={onClear} extraClass={`${styles.button} ${styles.button_clear}`}
                        isLoader={isLoader} disabled={stack.size === 0 ? true : false}/>
            </form>
            <div className={styles.textbox}>
                {stack.returnArray().map((item, index) => <Circle
                    head={index === stack.container.length - 1 ? 'head' : null} index={index}
                    letter={typeof (item) === "string" ? ' ':item?.letter}
                    state={typeof (item) === "string"? ElementStates.Default : item.state} key={index}/>
                )}
            </div>
        </SolutionLayout>)
};
