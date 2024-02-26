// @ts-nocheck
/// <reference types="cypress" />

import defaultAuth from "../fixtures/auth.ts";
import { EnvType } from "../fixtures/environment.ts";
import { hideBackgroundRequests } from "../support/hideBadCalls.js";

hideBackgroundRequests();

describe('Добавление товара в корзину (stage)', () => {
    const username = Cypress.env().username || defaultAuth.username;
    const password = Cypress.env().password || defaultAuth.password;

    before(() => {
        cy.setDesktopView();
        cy.fullLogin(EnvType.STAGE, username, password);
        cy.visit('/b2b/companies/switchContractor/?companyId=user&_from=/?_action=login&_success_login=1');
    });

    it('Покупка смартфона', () => {
        cy.visit('/catalog/smartfony--premium/')
            .log('Переход в категорию Смартфоны');

        cy.contains("В корзину")
            .first()
            .scrollIntoView()
            .focus()
            .click()
            .log('Товар добавлен в корзину');

        cy.contains("Оформить заказ")
            .first()
            .focus()
            .click({ force: true })
            .log('Переход в корзину');

        cy.get('[data-meta-name="BasketSnippet"]')
            .first()
            .within(() => {
                cy.get('[data-meta-name="AdditionalService"]')
                    .first()
                    .within(() => {
                        cy.get('input')
                            .first()
                            .focus()
                            .check({ force: true })
                            .log('Добавлена услуга');
                    });
            });

        cy.get('button')
            .filter('[data-meta-disabled="false"]')
            .contains("Перейти к оформлению")
            .click()
            .log('Переход в чекаут');

        if (cy.get('[name="INSURANCE_SECTION"]')) {
            cy.contains('Использовать данные получателя')
                .focus()
                .click()
                .log('Использованы данные получателя');

            cy.get('[name="insurance-form_email"]').invoke('attr', 'value').then((value) => {
                if (!value) {
                    cy.get('[name="insurance-form_email"]').type('autotester@citilink.ru');
                }
            })
        }

        cy.get('label')
            .filter('[data-meta-name="RadioButton"]')
            .contains("Самовывоз")
            .click({ force: true })
            .log('Выбран самовывоз');

        cy.get('[name="DELIVERY"]')
            .within(() => {
                cy.get('button').contains("пункт самовывоза")
                    .click();

            });

        cy.get('[data-meta-name="SelfDeliveryStoresList__select-button"]')
            .filter('[data-meta-disabled="false"]')
            .first()
            .click()
            .log('Выбран пункт самовывоза');

        cy.get('label')
            .filter('[data-meta-name="RadioButton"]')
            .contains("Наличными или картой при получении")
            .click()
            .log('Выбрана оплата Наличными или картой при получении');

        cy.get('[data-meta-name="SubmitButton"]')
            .filter('[data-meta-disabled="false"]')
            .contains("Оформить заказ")
            .click()
            .log('Оформление заказа, переход на TY');

        cy.contains("Заказ успешно создан!")
            .log('Тест завершен успешно!')
    });

    after(() => {
        cy.clearBasket();
    });
});
