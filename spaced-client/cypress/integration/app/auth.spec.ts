import {testID, dataCy} from '../../support/utils'
Cypress.Cookies.debug(true)
describe('Authentication', () => {
    before(() => {
        cy.visit('http://localhost:3000/')
        cy.clearTestAcc()
    })

    it('should display correct title', () => {
        dataCy('header').contains('Spaced')

    })

    it('should login an existing account, and error checking.', () => {
        dataCy('login-btn').contains('Login').click()
        dataCy('username-input').type('testac3')
        dataCy('password-input').type(Cypress.env('password'))
        dataCy('login-submit').contains('Submit').click()
        dataCy('login-error').contains('Username or password is incorrect')
        dataCy('username-input').clear().type('testacc1')
        dataCy('login-submit').contains('Submit').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        cy.verifyToken()
    })

    it('able to logout', () => {
        dataCy('settings-btn').click()
        dataCy('logout-btn').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it ('should register a new account, and error checking', () => {
        dataCy('login-btn').contains('Login').click()
        dataCy('register-tab').click()
        dataCy('firstname-input').type('test')
        dataCy('lastname-input').type('user')
        dataCy('email-input').type('sweic12345@gmail.com')
        dataCy('register-username-input').type('testacc2')
        dataCy('register-password-input').type(Cypress.env('password'))
        dataCy('register-cfm-password-input').type(Cypress.env('password'))
        dataCy('register-btn').click()
        dataCy('register-error').contains('Email is taken!')
        dataCy('email-input').clear().type('sweic123456@gmail.com')
        dataCy('register-username-input').clear().type('testacc1')
        dataCy('register-btn').click()
        dataCy('register-error').contains('Username is taken!')
        dataCy('register-username-input').clear().type('testacc2')
        dataCy('register-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        cy.verifyToken()        
    })

    



})