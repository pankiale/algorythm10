import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {circle, circleValue} from "../constants/constants";

describe("stack", () => {
    const getStack = () => {
        cy.get("input").type('aaa');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("input").type('bbb');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("input").type('ccc');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
    }
    beforeEach(() => {
        cy.visit("stack")
    });
    it("if is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    });
    it("add element", () => {
        cy.get("input").type('aaa');
        cy.get("button").contains("Добавить").click();
        cy.get(circle).contains('aaa').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('head')
        cy.get("@circle").siblings('p').contains('0')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'aaa', `${text.toLowerCase()} is not equal to aaa`)
        })
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("input").type('bbb');
        cy.get("button").contains("Добавить").click();
        cy.get(circle).contains('bbb').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('head')
        cy.get("@circle").siblings('p').contains('1')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'aaabbb', `${text.toLowerCase()} is not equal to aaabbb`)
        })
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("input").type('ccc');
        cy.get("button").contains("Добавить").click();
        cy.get(circle).contains('ccc').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('head')
        cy.get("@circle").siblings('p').contains('2')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'aaabbbccc', `${text.toLowerCase()} is not equal to aaabbbccc`)
        })
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it('delete element', () => {
        getStack();

        cy.get("button").contains("Удалить").click();
        cy.get(circle).contains('ccc').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'aaabbb', `${text.toLowerCase()} is not equal to aaabbb`)
        })
        cy.get("button").contains("Удалить").click();
        cy.get(circle).contains('bbb').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'aaa', `${text.toLowerCase()} is not equal to aaa`)
        });
    });
    it('clear stack', () => {
        getStack();

        cy.get("button").contains("Очистить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).should('not.exist');
    })
});