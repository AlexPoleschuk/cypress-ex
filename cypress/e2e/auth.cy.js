// @ts-nocheck
/// <reference types="cypress" />

const defaultAuthData = require("../fixtures/login.json");

const { hideBackgroundRequests } = require("../support/hideBadCalls");

hideBackgroundRequests();

describe('Авторизация на сайте citilink.ru', () => {
  before(() => {
    cy.setDesktopView();

    cy.goToMainPage('stage');
  });

  const username = Cypress.env().username || defaultAuthData.username;
  const password = Cypress.env().password || defaultAuthData.password;

  it('Авторизация', () => {
    cy.login(username, password);
  });
});
