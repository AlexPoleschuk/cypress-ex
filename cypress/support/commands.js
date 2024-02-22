// @ts-nocheck
/// <reference types="cypress" />

import defaultViewData from "../fixtures/view.ts";

const origin = {
    production: 'https://www.citilink.ru/',
    stage: 'https://www.citilink.stage.citilink.lt/',
};

Cypress.Commands.add('setDesktopView', () => {
    cy.viewport(...defaultViewData.desktop);
});

Cypress.Commands.add('setMobileView', () => {
    cy.viewport(...defaultViewData.mobile);
});

Cypress.Commands.add('goToMainPage', (env) => {
    cy.visit(origin[env]);
});

Cypress.Commands.add('login', (login, password) => {
    cy.get('[data-meta-name="UserButtonContainer"]')
        .contains("Войти")
        .click({ force: true });

    cy.get('[data-meta-name="Popup"]').within(() => {
        cy.get('[name="login"]').type(login);
        cy.get('[name="pass"]').type(password);
        cy.get('[type="Submit"]').click();
    });
});

Cypress.Commands.add('fullLogin', (env, login, password) => {
    cy.goToMainPage(env);
    cy.login(login, password);
});

Cypress.Commands.add('clearBasket', () => {
    cy.visit('/order');

    cy.get('a').filter('[href="/order/"]').contains("Корзина").then((btn) => {
        if (parseInt(btn.attr('data-meta-count'), 10) > 0) {
            cy.get('button')
                .contains("Очистить корзину")
                .click();
        }
    })
});
