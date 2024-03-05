// @ts-nocheck
/// <reference types="cypress" />

import defaultBaseUrl from "../fixtures/baseUrl.json";
import defaultViewData from "../fixtures/view.ts";
import origin from "../fixtures/origin.ts";
import { EnvType, getBaseUrlByEnv } from "../fixtures/environment.ts";

Cypress.Commands.add("setDesktopView", () => {
    cy.viewport(...defaultViewData.desktop);
});

Cypress.Commands.add("setMobileView", () => {
    cy.viewport(...defaultViewData.mobile);
});

Cypress.Commands.add("goToMainPage", (url) => {
    const withEnvFromJson = defaultBaseUrl.url.length > 0;

    const environment =
        Cypress.env().env ||
        (withEnvFromJson && EnvType.CUSTOM) ||
        EnvType.STAGE;

    const targetUrl = url || getBaseUrlByEnv(environment);

    cy.visit(targetUrl);
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

Cypress.Commands.add("fullLogin", (login, password, url) => {
    cy.goToMainPage(url);
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
