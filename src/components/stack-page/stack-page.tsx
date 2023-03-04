import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Stack} from "../../utils/stack";
import styles from "../stack-page/stack.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {TNumber, TText} from "../../types/data";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";


export const StackPage: React.FC = () => {

  const [stack, setStack] = useState(new Stack<TText>());
  const [value, setValue] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const value = event.target.value;
    setValue(value);
  }

  const onSubmit =(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.length) return alert('Введите текст');
    setIsLoader(true);
    // setTimeout(()=> {stack.push({letter: value, state: ElementStates.Changing });}, 500);
    // // @ts-ignore
    // stack.peak().state = ElementStates.Default
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.box} onSubmit={onSubmit} >
        <Input maxLength={4} name={'text'} value={value} isLimitText={true} onChange={onChange} />
        <Button text={'Добавить'} type={"submit"} extraClass={styles.button} isLoader={isLoader}/>
      </form>
      <div className={styles.textbox}>
        {stack.returnArray().map((item,index) => <Circle letter={item.letter} state={item.state} key = {index}/>
        )}
      </div>
    </SolutionLayout>
  );
};
