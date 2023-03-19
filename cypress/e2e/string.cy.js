import {circle, circleValue} from "../constants/constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe("string", () => {
    beforeEach(() => {
        cy.visit("recursion")
    });
    it("if input is empty alert is fired", () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Введите текст');
        });
        cy.get("input").clear();
        cy.get("button").contains("Развернуть").click();
    })
    it("string is reversing", () => {
        cy.get("input").type("строка")
        cy.get("button").contains("Развернуть").click();

        cy.get(circleValue).as('circleValues').then(item => {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'строка', `${text.toLowerCase()} is not equal to 'строка`)
        })
        cy.get(circle).as('circle').contains('с').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('т').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('р').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('о').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('к').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('а').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').contains('с').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('а').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circleValues').then(item => {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'атрокс', `${text.toLowerCase()} is not equal to 'атрокс`)
        })
        cy.get('@circle').contains('а').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('с').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').contains('т').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('к').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circleValues').then(item => {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'акротс', `${text.toLowerCase()} is not equal to 'акротс`)
        })
        cy.get('@circle').contains('к').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('т').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle').contains('р').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('о').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circleValues').then(item => {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'акортс', `${text.toLowerCase()} is not equal to 'акортс`)
        })
        cy.get('@circle').contains('о').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('р').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
    })
});