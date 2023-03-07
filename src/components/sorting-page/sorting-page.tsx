import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {pause, random} from "../../utils";
import styles from "./sorting-page.module.css"
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {TNumber} from "../../types/data";


export const SortingPage: React.FC = () => {
    const [workItemArray, setWorkItemArray] = useState<TNumber[]>([])
    const [sortType, setSortType] = useState<string>('selection')
    const [isAsc, setAsc] = useState<boolean>(true)
    const [inProgress, setInProgress] = useState<{ ascState: boolean, descState: boolean }>({
        ascState: false,
        descState: false
    })
    const [isDisabled, setDisabled] = useState<boolean>()

    const swap = (arr: TNumber[], i: number, j: number) => {
        let temp = arr[i]
        arr[i] = arr[j];
        arr[j] = temp;
    }
    const getRandomArr = () => {
        setWorkItemArray(random(3, 17)
            .reduce<TNumber[]>((acc, item) => (
                [...acc, {item: item, state: ElementStates.Default}]), []));
    }

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setSortType(e.target.value);
    }

    const bubbleSort = async (arr: TNumber[]) => {
        let n = arr.length;
        let swapped;

        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                let current = arr[i];
                let next = arr[i + 1];
                current.state = ElementStates.Changing;
                next.state = ElementStates.Changing;
                setWorkItemArray([...arr]);
                await pause(DELAY_IN_MS);
                // Check the sorting direction and swap the elements accordingly
                if (isAsc ? current.item > next.item : current.item < next.item) {
                    arr[i] = next;
                    arr[i + 1] = current;
                    swapped = true;
                }
                arr[i].state = ElementStates.Default;
                if (arr[i + 1]) arr[i + 1].state = ElementStates.Default;
                setWorkItemArray([...arr]);
            }
            arr[n - 1].state = ElementStates.Modified;
            setWorkItemArray([...arr]);
            n--;
        } while (swapped);

        return arr;
    }



    const selectionSort = async (arr: TNumber[]) => {
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            arr[minIndex].state = ElementStates.Changing;
            for (let j = i + 1; j < arr.length; j++) {
                arr[j].state = ElementStates.Changing;
                setWorkItemArray([...arr]);
                await pause(DELAY_IN_MS);
                if (isAsc ? arr[j].item < arr[minIndex].item : arr[j].item > arr[minIndex].item) {
                    minIndex = j;
                }
                arr[j].state = ElementStates.Default;
                setWorkItemArray([...arr]);
            }
            if (minIndex !== i) {
                arr[minIndex].state = ElementStates.Modified;
                arr[i].state = ElementStates.Default;
                swap(arr, i, minIndex);
            } else {
                arr[i].state = ElementStates.Modified;
            }
            setWorkItemArray([...arr]);
        }
        return arr;
    }


    useEffect(() => {
        getRandomArr();

        return () => {
            setWorkItemArray([])
        }
    }, []);

    const handleSort = async () => {
        setDisabled(true)
        if (sortType != 'selection') {
            setWorkItemArray(await bubbleSort(workItemArray));
        } else {
            setWorkItemArray(await selectionSort(workItemArray));
        }
        setInProgress({
            ascState: false,
            descState: false,
        })
        setDisabled(false)
    }

    const handleAscendingSort = () => {
        setAsc(true);
        setInProgress({
            ...inProgress,
            ascState: true,
        })
        handleSort()
    }

    const handleDescendingSort = () => {
        setAsc(false);
        setInProgress({
            ...inProgress,
            descState: true,
        })
        handleSort()
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <form className={styles.formWrapper}>
                <div className={styles.formItem}>
                    <RadioInput
                        disabled={isDisabled}
                        label="Выбор"
                        name={"type"}
                        value={"selection"}
                        defaultChecked
                        extraClass="mr-20"
                        onChange={handleRadio}
                    />
                    <RadioInput
                        disabled={isDisabled}
                        label="Пузырек"
                        name={"type"}
                        value={"bubble"}
                        onChange={handleRadio}
                    />
                </div>
                <div className={styles.formItem}>
                    <Button
                        isLoader={inProgress.ascState}
                        disabled={isDisabled}
                        text="По возрастанию"
                        onClick={handleAscendingSort}
                        sorting={Direction.Ascending}
                        extraClass="mr-6"
                    />
                    <Button
                        isLoader={inProgress.descState}
                        disabled={isDisabled}
                        text="По убыванию"
                        onClick={handleDescendingSort}
                        sorting={Direction.Descending}
                        extraClass="mr-40"
                    />
                    <Button
                        disabled={isDisabled}
                        text="Новый массив"
                        onClick={getRandomArr}
                    />
                </div>
            </form>
            <ul className={styles.array}>
                {workItemArray.map((item, index) => {
                    return (<Column
                        key={index}
                        index={item.item}
                        state={item.state}
                    />)
                })}
            </ul>
        </SolutionLayout>
    );
};