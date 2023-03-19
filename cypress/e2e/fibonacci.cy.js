import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {circle, circleValue} from "../constants/constants";

describe("fibonacci", () => {
    beforeEach(() => {
        cy.visit("fibonacci")
    });
    it("if input is empty alert is fired", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Введите число от 1 до 19');
        });
        cy.get("input").clear();
        cy.get("button").contains('Рассчитать').click();
    });
    it("fibonacci algorithm is working", () => {
        cy.get("input").type('5')
        cy.get("button").contains("Рассчитать").click();
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circleValue).as('circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '0', `${text.toLowerCase()} is not equal to '0`)
        })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '01', `${text.toLowerCase()} is not equal to '01`)
        })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '011', `${text.toLowerCase()} is not equal to '011`)
        })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '0112', `${text.toLowerCase()} is not equal to '0112`)
        })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '01123', `${text.toLowerCase()} is not equal to '01123`)
        })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '011235', `${text.toLowerCase()} is not equal to '011235`)
        })
    })
})