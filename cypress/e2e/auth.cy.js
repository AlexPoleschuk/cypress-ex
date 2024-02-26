// @ts-nocheck
/// <reference types="cypress" />

import { EnvType } from "../fixtures/environment.ts";
import defaultAuth from "../fixtures/auth.ts";

import { hideBackgroundRequests } from "../support/hideBadCalls";

hideBackgroundRequests();

describe('Авторизация', () => {
  const username = Cypress.env().username || defaultAuth.username;
  const password = Cypress.env().password || defaultAuth.password;
  const environment = Cypress.env().env || EnvType.STAGE;

  before(() => {
    cy.setDesktopView();

    cy.goToMainPage(environment);
  });

  it('Авторизация', () => {
    cy.fullLogin(environment, username, password);

    cy.visit('/profile/');
    cy.get('Мой профиль').should('be.visible');
  });
});
