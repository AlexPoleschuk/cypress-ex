// @ts-nocheck
/// <reference types="cypress" />

import defaultAuth from "../fixtures/auth.json";

import { hideBackgroundRequests } from "../support/hideBadCalls";

hideBackgroundRequests();

describe("Авторизация", () => {
    const username = Cypress.env().username || defaultAuth.username;
    const password = Cypress.env().password || defaultAuth.password;

    it("Авторизация", () => {
        cy.setDesktopView();
        cy.goToMainPage();
        cy.fullLogin(username, password);

        cy.visit("/profile/");
        cy.contains("Профиль").log("Тест завершен успешно!");
    });
});
