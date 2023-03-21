import renderer from 'react-test-renderer';
import { Circle } from './circle';
import {ElementStates} from "../../../types/element-states";


describe("circle tests", () => {
    it("empty circle", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with letter", () => {
        const tree = renderer
            .create(<Circle letter={'123'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with head", () => {
        const tree = renderer
            .create(<Circle head={'0'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with node in head", () => {
        const tree = renderer
            .create(<Circle head={<p>Тест</p>}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with tail", () => {
        const tree = renderer
            .create(<Circle tail={'0'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with node in tail", () => {
        const tree = renderer
            .create(<Circle tail={<p>Тест</p>}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle with index", () => {
        const tree = renderer
            .create(<Circle index={0}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle isSmall", () => {
        const tree = renderer
            .create(<Circle isSmall={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle default", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle changing", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("circle modified", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})