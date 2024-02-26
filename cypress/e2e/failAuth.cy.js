// @ts-nocheck
/// <reference types="cypress" />

import { EnvType } from "../fixtures/environment.ts";

import { hideBackgroundRequests } from "../support/hideBadCalls";

hideBackgroundRequests();

describe('Авторизация', () => {
    const environment = Cypress.env().env || EnvType.STAGE;

    it('Авторизация', () => {
        cy.setDesktopView();
        cy.goToMainPage(environment);
        // fake
        cy.fullLogin(environment, 'username', 'password');

        cy.visit('/profile/');
        cy.contains('Мой профиль').log('Тест завершен успешно!');
    });
});
