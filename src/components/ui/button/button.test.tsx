import renderer from 'react-test-renderer';
import {fireEvent, render, screen} from "@testing-library/react";
import {Button} from "./button";

const buttonTextStub = 'Текст кнопки'

describe("button tests", () => {
    it('button text', () => {
        const tree = renderer
            .create(<Button text={buttonTextStub}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('button no text', () => {
        const tree = renderer
            .create(<Button/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('button disabled', () => {
        const tree = renderer
            .create(<Button disabled/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('button loading', () => {
        const tree = renderer
            .create(<Button isLoader/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('button onclick', () => {
        const mockOnClick = jest.fn();
        render(<Button text={"testText"} onClick={mockOnClick}/>)
        const button = screen.getByText('testText');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    })
})