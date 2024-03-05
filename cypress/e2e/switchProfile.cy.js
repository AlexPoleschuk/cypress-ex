// @ts-nocheck
/// <reference types="cypress" />

import { EnvType, getBaseUrlByEnv } from "../fixtures/environment.ts";
import defaultAuth from "../fixtures/auth.json";

import { hideBackgroundRequests } from "../support/hideBadCalls";

hideBackgroundRequests();

describe("Переключение профиля на b2c пользователя", () => {
    const username = Cypress.env().username || defaultAuth.username;
    const password = Cypress.env().password || defaultAuth.password;

    it("Переключение профиля", () => {
        cy.setMobileView();
        cy.fullLogin(username, password, getBaseUrlByEnv(EnvType.STAGE));
        cy.visit(
            "/b2b/companies/switchContractor/?companyId=user&_from=/?_action=login&_success_login=1",
        );

        cy.contains("Профиль")
            .click()
            .log("Открытие мобильного попапа профиля (1)");

        cy.contains("Переключить профиль")
            .click()
            .log("Открытие попапа переключения профиля");

        cy.get("a")
            .first()
            .click({ force: true })
            .log("Переключение на b2c пользователя");

        cy.visit(
            "/b2b/companies/switchContractor/?companyId=user&_from=/?_action=login&_success_login=1",
        );

        cy.contains("Профиль")
            .click()
            .log("Открытие мобильного попапа профиля (2)");

        cy.contains("Мой профиль");
        cy.contains("Настройки профиля");
    });
});
