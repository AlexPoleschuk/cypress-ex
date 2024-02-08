// @ts-nocheck
/// <reference types="cypress" />

describe('Авторизация на сайте citilink.ru', () => {
  before(() => {
    cy.setDesktopView();

    cy.goToMainPage('stage');
  });

  it('Авторизация', () => {
    cy.login(
      'autotester@citilink.ru',
      '21452145',
    );
  });
});
