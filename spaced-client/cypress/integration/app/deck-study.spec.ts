import { dataCy } from "../../support/utils"

describe('Reads deck successfully', () => {
    before(() => {
        cy.login()
    })

    it('Deck shows up on Dashboard and My Cards tabs', () => {
        dataCy('home-dashboard').should('exist')
        dataCy('home-dashboard-completion').should('have.text', '0 / 1')
        dataCy('home-dashboard-todo').find('h3').should('have.text', '0 / 1')
        dataCy('home-dashboard-todo').find('h1').should('have.text', 'Imported Deck Test 1').click()
        cy.url().should('contain', 'u/study/')
        dataCy('app-header-back-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')

        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').should('exist')
        dataCy('home-mycards-container').find('h1').should('have.text', 'Imported Deck Test 1').click()
        cy.url().should('contain', 'u/study/')
        dataCy('app-header-back-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        dataCy('home-mycards-container').should('exist')
        dataCy('home-dashboard').should('not.exist')

    })

    it('Reads deck smoothly', () => {
        dataCy('home-mycards-container').find('h1').should('have.text', 'Imported Deck Test 1').click()
        cy.url().should('contain', 'u/study/')
        validateCards(1)
        dataCy('study-next-btn').click()
        validateCards(2)
        dataCy('study-next-btn').click()
        validateCards(3)
        dataCy('study-next-btn').should('not.exist')
        dataCy('study-check-btn').should('exist').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
    })

    it('Updates dashboard appropriately', () => {
        dataCy('home-dashboard').should('exist')
        dataCy('home-dashboard-completion').should('have.text', '1 / 1')
        dataCy('home-dashboard-todo').find('h3').should('have.text', '1 / 1')
    })
})

const validateCards = (index: number) => {
    dataCy('study-back-card').should('not.exist')
    dataCy('study-front-card').should('exist').and('have.text', `Study ${index} Front card`)
    dataCy('study-flashcards-box').trigger('keyup', {keyCode: 32})
    dataCy('study-front-card').should('not.exist')
    dataCy('study-back-card').should('exist').and('have.text', `Study ${index} Back card`)
    dataCy('study-progress-bar').invoke('width').should('be.greaterThan', 239 * index)
}