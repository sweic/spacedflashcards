///<reference path="../global.d.ts" />
import {testID, dataCy} from './utils'
Cypress.Commands.add('verifyToken', () => {
    cy.getCookies().should('have.length', 2).then((cookies) => {
        expect(cookies[0]).to.have.property('name', 'accessToken')
        expect(cookies[1]).to.have.property('name', 'refreshToken')
    })
})

Cypress.Commands.add('clearTestAcc', () => {
    cy.request('http://localhost:5000/clearTestAcc')
})

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/')
    dataCy('login-btn').contains('Login').click()
    dataCy('username-input').type('testacc2')
    dataCy('password-input').type(Cypress.env('password'))
    dataCy('login-submit').contains('Submit').click()
    cy.url().should('eq', 'http://localhost:3000/u/home')
})

Cypress.Commands.add('loginReceiver', () => {
    dataCy('login-btn').contains('Login').click()
    dataCy('username-input').type('testacc1')
    dataCy('password-input').type(Cypress.env('password'))
    dataCy('login-submit').contains('Submit').click()
    cy.url().should('eq', 'http://localhost:3000/u/home')
})