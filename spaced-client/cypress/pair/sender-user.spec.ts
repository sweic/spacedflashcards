import { dataCy, testID } from "../support/utils"

describe('sender logins', () => {
    before(() => {
        cy.request('http://localhost:5000/resetAccounts')
        cy.visit('http://localhost:3000')
        cy.get(testID('login-btn')).contains('Login').click()
        cy.get(testID('username-input')).type('testacc2')
        cy.get(testID('password-input')).type(Cypress.env('password'))
        cy.get(testID('login-submit')).contains('Submit').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')

    })

    it('go to friend page', () => {
        dataCy('sidebar-friends-btn').click()
        dataCy('friendlist').should('exist')
        
    })

    it('search for friend', () => {
        dataCy('search-tab-btn').click()
        dataCy('friend-search').should('exist')
        dataCy('search-input').type('tes')
        dataCy('friend-search-list').should('have.descendants', testID('user-search-testacc1'))
        dataCy('search-input').clear().type('testacc1')
        cy.wait(1000)
        dataCy('friend-search-list').should('have.descendants', testID('user-search-testacc1')).within(() => {
            dataCy('is-friend-icon').should('not.exist')
            dataCy('sent-icon').should('not.exist')
            dataCy('send-friend-btn').should('exist').click()
        })
    })

    it("friend accepts and receives notifications", () => {
        dataCy('activity-tab-btn').click()
        dataCy('activity-list').should('exist')
        dataCy('activity-accepted-testacc2').contains('New Friend')
        dataCy('activity-accepted-testacc2').contains('testacc1 has accepted your friend request')
    })

    it('creates a new deck to share', () => {
        dataCy('create-btn').click()
        dataCy('new-deck-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/create')

        dataCy('create-deck-title-input').type('Deck to Share')
        dataCy('create-deck-desc-input').type('Share deck desc')
        dataCy('create-deck-number-input').clear().type('4')
        dataCy('create-deck-next-btn').click()

        rteInput(1)
        dataCy('create-next-card-btn').click()
        rteInput(2)
        dataCy('create-deck-curr').contains('2 / 2')

        dataCy('create-save-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').contains('h1','Deck to Share')
    })

    it('send share request', () => {
        dataCy('home-mycards-container').contains('h1','Deck to Share')
        dataCy('deck-share-btn').click()
        dataCy('deck-share-friends-btn').click()
        dataCy('share-checkbox-testacc1').click()
        dataCy('share-friends-btn').click()
    })
    
    
})

const rteInput = (index: number) => {
    dataCy('rte-front-input').type(`hello ${index} front card`)
    dataCy('rte-back-input').type(`hello ${index} back card`)
}