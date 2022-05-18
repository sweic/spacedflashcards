import { dataCy, testID } from "../support/utils"

describe('receiver logins', () => {
    before(() => {
        cy.request('http://localhost:5000/resetAccounts')
        cy.visit('http://localhost:3000')
        cy.get(testID('login-btn')).contains('Login').click()
        cy.get(testID('username-input')).type('testacc1')
        cy.get(testID('password-input')).type(Cypress.env('password'))
        cy.get(testID('login-submit')).contains('Submit').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')

    })

    it('go to friend page', () => {
        dataCy('sidebar-friends-btn').click()
        dataCy('friendlist').should('exist')
    })

    it('receives and accept friend request', () => {
        dataCy('activity-tab-btn').click()
        dataCy('activity-list').should('exist')
        dataCy('activity-list').should('have.descendants', testID('activity-request-testacc2'))
        dataCy('activity-request-testacc2-btn').click()
        dataCy('activity-accept-testacc1').contains('New Friend')
        dataCy('activity-accept-testacc1').contains('You have accepted testacc2\'s friend request')

    })

    it('receives and accept share request', () => {
        dataCy('activity-list').should('have.descendants', testID('activity-share-testacc2'))
        dataCy('activity-share-testacc2-btn').click()
        dataCy('activity-imported-testacc2').contains('You have imported testacc2\'s deck titled Deck to Share')
        dataCy('activity-imported-testacc2').contains('New Deck')
    })

    it('deletes activity history', () => {
        dataCy('activity-accept-testacc1-delete-btn').click()
        dataCy('activity-list').should('not.have.descendants', testID('activity-request-testacc2')).and('have.descendants', testID('activity-imported-testacc2'))
        dataCy('activity-imported-testacc2-delete-btn').click({force: true})
        dataCy('activity-list').should('not.have.descendants', testID('activity-imported-testacc2'))
        
    })

})