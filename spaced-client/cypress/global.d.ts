/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        clearTestAcc(): Chainable<void>;
        verifyToken(): Chainable<void>;
        login(): Chainable<void>;
        loginReceiver(): Chainable<void>


    }
}