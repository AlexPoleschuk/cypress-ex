// @ts-nocheck
/// <reference types="cypress" />

import defaultAuth from "../fixtures/auth.json";
import { EnvType, getBaseUrlByEnv } from "../fixtures/environment.ts";
import { hideBackgroundRequests } from "../support/hideBadCalls.js";

hideBackgroundRequests();

describe("Добавление товара в корзину (stage)", () => {
    const username = Cypress.env().username || defaultAuth.username;
    const password = Cypress.env().password || defaultAuth.password;

    it("Покупка смартфона", () => {
        cy.setDesktopView();
        cy.fullLogin(username, password, getBaseUrlByEnv(EnvType.STAGE));
        cy.visit(
            "/b2b/companies/switchContractor/?companyId=user&_from=/?_action=login&_success_login=1",
        );
        cy.clearBasket();

        cy.visit("/catalog/smartfony--premium/").log(
            "Переход в категорию Смартфоны",
        );

        cy.contains("В корзину")
            .first()
            .scrollIntoView()
            .focus()
            .click()
            .log("Товар добавлен в корзину");

        cy.contains("Оформить заказ")
            .first()
            .focus()
            .click({ force: true })
            .log("Переход в корзину");

        cy.get('[data-meta-name="BasketSnippet"]')
            .first()
            .within(() => {
                cy.get('[data-meta-name="AdditionalService"]')
                    .first()
                    .within(() => {
                        cy.get("input")
                            .first()
                            .focus()
                            .check({ force: true })
                            .log("Добавлена услуга");
                    });
            });

        cy.get("button")
            .contains("Перейти к оформлению")
            .click({ force: true })
            .log("Переход в чекаут");

        cy.get("label")
            .filter('[data-meta-name="RadioButton"]')
            .contains("Самовывоз")
            .click({ force: true })
            .log("Выбран самовывоз");

        cy.get('[name="DELIVERY"]').within(() => {
            cy.get("button")
                .contains("пункт самовывоза")
                .click({ force: true });
        });

        cy.get('[data-meta-name="SelfDeliveryStoresList__select-button"]')
            .first()
            .click({ force: true })
            .log("Выбран пункт самовывоза");

        cy.get("label")
            .filter('[data-meta-name="RadioButton"]')
            .contains("Наличными или картой при получении")
            .click({ force: true })
            .log("Выбрана оплата Наличными или картой при получении");

        cy.get('[data-meta-name="SubmitButton"]').contains("Оформить заказ");
    });
});
