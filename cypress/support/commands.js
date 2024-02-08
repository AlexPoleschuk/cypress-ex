// @ts-nocheck
/// <reference types="cypress" />

const authData = require("../fixtures/login.json");

const origin = {
    production: 'https://www.citilink.ru/',
    stage: 'https://www.citilink.stage.citilink.lt/',
};

Cypress.Commands.add('setDesktopView', () => {
    cy.viewport(1280, 1024);
});

Cypress.Commands.add('goToMainPage', (env) => {
    cy.visit(origin[env]);
});

Cypress.Commands.add('login', (login = authData.email, password = authData.password) => {
    cy.get('[data-meta-name="UserButtonContainer"]')
        .contains("Войти")
        .click();

    cy.get('[data-meta-name="Popup"]').within(() => {
        cy.get('[name="login"]').type(login);
        cy.get('[name="pass"]').type(password);
        cy.get('[type="Submit"]').click();
    });
});

Cypress.Commands.add('fullLogin', (env, login, password) => {
    cy.setDesktopView()
        .goToMainPage(env)
        .login(login, password);
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
