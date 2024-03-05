// @ts-nocheck
/// <reference types="cypress" />

import defaultBaseUrl from "../fixtures/baseUrl.json";
import defaultViewData from "../fixtures/view.ts";
import origin from "../fixtures/origin.ts";
import { EnvType } from "../fixtures/environment.ts";

Cypress.Commands.add("setDesktopView", () => {
    cy.viewport(...defaultViewData.desktop);
});

Cypress.Commands.add("setMobileView", () => {
    cy.viewport(...defaultViewData.mobile);
});

Cypress.Commands.add("goToMainPage", (env) => {
    const environment = env || Cypress.env().env || EnvType.CUSTOM;

    if (environment === EnvType.CUSTOM) {
        cy.visit(defaultBaseUrl.url);
    } else {
        cy.visit(origin[env]);
    }
});

Cypress.Commands.add("login", (login, password) => {
    cy.get('[data-meta-name="UserButtonContainer"]')
        .contains("Войти")
        .click({ force: true });

    cy.get('[data-meta-name="Popup"]').within(() => {
        cy.get('[name="login"]').type(login);
        cy.get('[name="pass"]').type(password);
        cy.get('[type="Submit"]').click();
    });
});

Cypress.Commands.add("fullLogin", (env, login, password) => {
    cy.goToMainPage(env);
    cy.login(login, password);
});

Cypress.Commands.add("clearBasket", () => {
    cy.visit("/order");

    cy.get("a")
        .contains("Корзина")
        .then((btn) => {
            if (parseInt(btn.attr("data-meta-count"), 10) > 0) {
                cy.get("button").contains("Очистить корзину").click();
            }
        });
});
