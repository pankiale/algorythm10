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
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const QueuePage: React.FC = () => {

    const [queue, setQueue] = useState(new Queue<TText>(7));
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
        queue.enqueue({letter: value, state: ElementStates.Changing});
        setQueue(queue);

        setTimeout(() => {
            const topElement = queue.getContainer()[queue.getTail() - 1];
            if (topElement?.state) topElement.state = ElementStates.Default;
            setQueue(queue)
            setValue("");
            setIsLoader(false);
        }, SHORT_DELAY_IN_MS);
    };


    const onDelete = () => {
        setIsLoader(true);
        const topElement = queue.peak()
        if (topElement?.state) topElement.state = ElementStates.Changing;
        setQueue(queue);

        setTimeout(() => {
            queue.dequeue();
            setQueue(queue);
            setIsLoader(false);
        }, SHORT_DELAY_IN_MS);
    }

    const onClear = () => {
        const newStack = new Queue<TText>(7);
        setQueue(newStack);
        setValue('');
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={styles.box} onSubmit={onSubmit}>
                <Input maxLength={4} name={'text'} value={value} isLimitText={true} onChange={onChange}/>
                <Button text={'Добавить'} type={"submit"} extraClass={styles.button} isLoader={isLoader}
                        disabled={!value.length || queue.getTail() === 7}/>
                <Button text={'Удалить'} onClick={onDelete} extraClass={styles.button} isLoader={isLoader}
                        disabled={queue.getLength() === 0}/>
                <Button text={'Очистить'} onClick={onClear} extraClass={`${styles.button} ${styles.button_clear}`}
                        isLoader={isLoader} disabled={queue.getLength() === 0}/>
            </form>
            <div className={styles.textbox}>
                {Array.from({length: queue.getSize()}, (_, index) => (
                    <Circle
                        key={index}
                        index={index}
                        head={queue.getLength()>0? index === queue.getHead() ? "head" : null: null}
                        tail={queue.getLength()>0? index === queue.getTail()-1 ? "tail" : null : null}
                        letter={queue.getContainer()[index]?.letter ?? " "}
                        state={queue.getContainer()[index]?.state ?? ElementStates.Default}
                    />
                ))}
            </div>
        </SolutionLayout>)
};
