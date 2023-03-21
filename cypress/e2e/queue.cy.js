import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";
import {circle, circleValue} from "../constants/constants";

describe("queue", () => {
    const prepareQueue = () => {
        cy.get("input").type('16');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("input").type('18');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("input").type('20');
        cy.get("button").contains("Добавить").click();
        cy.wait(SHORT_DELAY_IN_MS);
    }
    beforeEach(() => {
        cy.visit("queue")
    });
    it("if empty input disable button", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    });
    it("add to queue", () => {
        cy.get("input").type('16');
        cy.get("button").contains("Добавить").click();
        cy.get(circle).as('circle')
        cy.get("@circle").first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").siblings('div').contains('head')
        cy.get("@circle").siblings('div').contains('tail')
        cy.get("@circle").siblings('p').contains('0')
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").contains('16')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '16', `${text.toLowerCase()} is not equal to '16`)
        })

        cy.get("input").type('20');
        cy.get("button").contains("Добавить").click();
        cy.get('@circle').contains('16').as('circleValue').parent('div').siblings('div').contains('head');
        cy.get('@circle').siblings('p').contains('1').parent().children(circle)
            .invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circle').contains('20');
        cy.get('@circle').siblings('div').contains('tail');
        cy.get("@circle").siblings('p').contains('1')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '1620', `${text.toLowerCase()} is not equal to '1620`)
        });
    });
    it ('delet from queue', () => {
        prepareQueue();

        cy.get("button").contains("Удалить").click();
        cy.get(circle).as('circle').contains('16').parent("div").as('currentCircle')
        cy.get("@currentCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@circle').contains('18').parent("div").as('currentCircle')
        cy.get('@currentCircle').siblings('div').contains('head');
        cy.get('@circle').contains('20').parent("div").as('currentCircle')
        cy.get('@currentCircle').siblings('div').contains('tail');
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '1820', `${text.toLowerCase()} is not equal to '1820`)
        });
    });
    it ('clear queue', () => {
        prepareQueue();

        cy.get("button").contains("Очистить").click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).as('circle').contains('16').should('not.exist');
        cy.get('@circle').contains('18').should('not.exist');
        cy.get('@circle').contains('20').should('not.exist');
    })
});