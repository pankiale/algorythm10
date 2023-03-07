import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {LinkedList} from "../../utils/linked-list";
import styles from "../list-page/list.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const ListPage: React.FC = () => {

    const [list, setList] = useState(LinkedList.fromArray([0, 32, 8, 1]));
    const [visArray, setVisArray] = useState<{ element: number | null, elementState: ElementStates, index: number, isHead: boolean, isTail: boolean }[]>([]);
    const [value, setValue] = useState('');
    const [valueForDelete, setValueForDelete] = useState('');
    const [indexValue, setIndexValue] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [targetIndex, setTargetIndex] = useState(0);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    const onIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const indexValue = event.target.value;
        setIndexValue(indexValue);
    }

    const [addItem, setAddItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);

    const onAddToHead = () => {
        setIsLoader(true);
        setTargetIndex(0);
        setAddItem(true)
        list.add(+value);
        setList(list);
        setTimeout(() => {
            const temp = list.print()
            temp[0].elementState = ElementStates.Modified
            setVisArray(temp);
            setIsLoader(false);
            setAddItem(false);
            setTimeout(() => {
                const temp = list.print();
                setVisArray(temp);
                setValue('');
            }, 500)
        }, 500);
    }

    const onAddByIndex = () => {
        setIsLoader(true);
        setTargetIndex(0);
        setAddItem(true);

        const intervalId = setInterval(() => {
            setTargetIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                if (newIndex <= +indexValue) {
                    visArray[newIndex-1].elementState = ElementStates.Changing;
                }
                return newIndex;
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            setAddItem(false);

            list.insertAt(+value, +indexValue);
            setList(list);
            const temp = list.print();
            temp[+indexValue].elementState = ElementStates.Modified;
            setVisArray(temp);

            setTimeout(()=>{
                const temp = list.print()
                setVisArray(temp)
                setValue('');
                setIndexValue('')
            },1000)

            setIsLoader(false);

        }, (+indexValue + 1) * 1000);
    };


    const onAddToTail = () => {
        setIsLoader(true);
        setAddItem(true)
        setTargetIndex(list.size - 1)
        list.addToTail(+value);
        setList(list);
        setTimeout(() => {
            const temp = list.print()
            temp[temp.length - 1].elementState = ElementStates.Modified
            setVisArray(temp);
            setIsLoader(false);
            setAddItem(false);
            setTimeout(() => {
                const temp = list.print();
                setVisArray(temp);
                setValue('');
            }, 500)
        }, 500);
    }
    const onDeleteFromHead = () => {
        setIsLoader(true);
        setDeleteItem(true)
        setValueForDelete(visArray[0].element!.toString())
        visArray[0].element = null
        setTargetIndex(0)
        list.removeFrom(0);
        setList(list);
        setTimeout(() => {
            const temp = list.print();
            setVisArray(temp);
            setIsLoader(false);
            setDeleteItem(false);
        }, 500);
    }
    const onDeleteFromTail = () => {
        setIsLoader(true);
        setDeleteItem(true)
        setValueForDelete(visArray[visArray.length - 1].element!.toString())
        visArray[visArray.length - 1].element = null
        setTargetIndex(visArray.length - 1)
        list.removeFrom(list.size - 1);
        setList(list);
        setTimeout(() => {
            const temp = list.print();
            setVisArray(temp);
            setIsLoader(false);
            setDeleteItem(false);
        }, 500);
    }

    const onDeleteByIndex = () => {
        setIsLoader(true);
        setTargetIndex(0);

        const intervalId = setInterval(() => {
            setTargetIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                if (newIndex <= +indexValue) {
                    visArray[newIndex-1].elementState = ElementStates.Changing;
                }
                return newIndex;
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            setValueForDelete(visArray[+indexValue].element!.toString())
            setDeleteItem(true);

            visArray[+indexValue].element = null
            list.removeFrom(+indexValue);
            setList(list);

            setTimeout(()=>{
                const temp = list.print()
                setVisArray(temp)
                setDeleteItem(false)
                setIndexValue('')
            },1000)

            setIsLoader(false);

        }, (+indexValue + 1) * 1000);
    };


    useEffect(() => {
            const newArray = list.print()
            setVisArray(newArray);
        },
        [])

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.box} onSubmit={(e) => e.preventDefault()}>
                <Input
                    maxLength={4}
                    name={'text'}
                    value={value}
                    isLimitText={true}
                    onChange={onChange}
                    extraClass={styles.input}
                />
                <Button
                    text={'Добавить в head'}
                    onClick={onAddToHead}
                    extraClass={styles.button}
                    isLoader={isLoader}
                    disabled={!value.length}/>
                <Button
                    text={'Добавить в tail'}
                    onClick={onAddToTail}
                    extraClass={styles.button}
                    isLoader={isLoader}
                    disabled={!value.length}/>
                <Button
                    text={'Удалить из head'}
                    onClick={onDeleteFromHead}
                    extraClass={styles.button}
                    isLoader={isLoader}
                    disabled={list.print().length === 0}/>
                <Button
                    text={'Удалить из tail'}
                    onClick={onDeleteFromTail}
                    extraClass={styles.button}
                    isLoader={isLoader}
                    disabled={list.print().length === 0}/>
            </form>
            <form className={styles.box} onSubmit={(e) => e.preventDefault()}>
                <Input
                    onChange={onIndexChange}
                    type='number'
                    min={0}
                    max={list.size-1}
                    isLimitText={true}
                    value={indexValue}
                    extraClass={styles.input}
                    placeholder={'Введите индекс'}
                />
                    <Button
                        text='Добавить по индексу'
                        onClick={onAddByIndex}
                        extraClass={styles.button_large}
                        isLoader={isLoader}
                        disabled={!indexValue.length}
                    />
                    <Button
                        text='Удалить по индексу'
                        extraClass={styles.button_large}
                        onClick={onDeleteByIndex}
                        isLoader={isLoader}
                        disabled={!indexValue.length}
                    />
            </form>
            <div className={styles.textbox}>
                {!addItem && !deleteItem && visArray.map((item, index) => <React.Fragment key={index}><Circle
                        head={item.isHead ? 'head' : null} tail={item.isTail ? 'tail' : null} index={index}
                        letter={item.element?.toString()}
                        state={item.elementState}/> {!item.isTail && <ArrowIcon/>}
                    </React.Fragment>
                )}
                {addItem && visArray.map((item, index) => <React.Fragment key={index}><Circle
                        head={index === targetIndex ?
                            <Circle isSmall={true} letter={value} state={ElementStates.Changing}/> : null}
                        tail={item.isTail ? 'tail' : null}
                        index={index}
                        letter={item.element?.toString()}
                        state={item.elementState}/> {!item.isTail && <ArrowIcon/>}
                    </React.Fragment>
                )}
                {deleteItem && visArray.map((item, index) => <React.Fragment key={index}><Circle
                        head={item.isHead ? 'head' : null}
                        tail={index === targetIndex-1 ?
                            <Circle isSmall={true} letter={valueForDelete} state={ElementStates.Changing}/> : null}
                        index={index}
                        letter={item.element?.toString()}
                        state={item.elementState}/> {!item.isTail && <ArrowIcon/>}
                    </React.Fragment>
                )}
            </div>
        </SolutionLayout>
    );
};

