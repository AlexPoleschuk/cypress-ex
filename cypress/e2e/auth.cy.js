// @ts-nocheck
/// <reference types="cypress" />

import { EnvType } from "../fixtures/environment.ts";
import defaultAuth from "../fixtures/auth.json";

import { hideBackgroundRequests } from "../support/hideBadCalls";

hideBackgroundRequests();

describe("Авторизация", () => {
    const username = Cypress.env().username || defaultAuth.username;
    const password = Cypress.env().password || defaultAuth.password;
    const environment = Cypress.env().env || EnvType.STAGE;

    it("Авторизация", () => {
        cy.setDesktopView();
        cy.goToMainPage(environment);
        cy.fullLogin(environment, username, password);

        cy.visit("/profile/");
        cy.contains("Мой профиль").log("Тест завершен успешно!");
    });
});
