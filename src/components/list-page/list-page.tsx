import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {LinkedList} from "../../utils/linked-list";
import styles from "../list-page/list.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {

    const [list, setList] = useState(LinkedList.fromArray([0, 32, 8, 1]));


    console.log(list)
    console.log(list.print())
    return (
        <SolutionLayout title="Связный список">
            <div className={styles.textbox}>
                {list.print().map((item, index) => <React.Fragment key={index}><Circle
                        head={item.isHead ? 'head' : null} tail={item.isTail ? 'tail' : null} index={index}
                        letter={item.element.toString()}
                        state={ElementStates.Default}/> <ArrowIcon/>
                    </React.Fragment>
                )}
            </div>
        </SolutionLayout>
    );
};

