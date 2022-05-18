import {testID, dataCy} from '../../support/utils'

describe('create new deck', () => {
    before(() => {
        cy.login()
    })
    it('accessing deck create', () => {
        dataCy('create-btn').click()
        dataCy('new-deck-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/create')
    })

    it('deck details functionality', () => {
        dataCy('create-deck-title-input').type('This is a Test Deck Title')
        dataCy('create-deck-desc-input').type('This is a Test Deck Desc')
        dataCy('create-deck-number-input').clear().type('3')
        dataCy('create-deck-next-btn').click()
    })

    it('text editor and buttons functionality', () => {
        rteInput(1)
        dataCy('create-next-card-btn').click()
        rteInput(2)
        dataCy('create-deck-curr').contains('2 / 2')
        dataCy('create-add-card-btn').click()
        dataCy('create-deck-curr').contains('3 / 3')
        rteInput(3)
        dataCy('create-previous-card-btn').click()
        dataCy('create-deck-curr').contains('2 / 3')
        dataCy('create-delete-card-btn').click()
        dataCy('create-deck-curr').contains('1 / 2')
        validateRteInput(1)
        dataCy('create-next-card-btn').click()
        validateRteInput(3)
    })

    it('overview functionality', () => {
        dataCy('create-open-addoptions-btn').click()
        dataCy('create-open-overview-btn').click()
        dataCy('create-overview').should('exist')
        dataCy('create-overview-header').contains('Deck Overview')
        dataCy('overview-card-1-flip').click()
        dataCy('overview-card-1-back').find('p').contains('hello 3 back card')
        dataCy('overview-card-0-jump').click()
        dataCy('create-deck-curr').contains('1 / 2')
        validateRteInput(1)
        cy.wait(500)
        dataCy('create-overview').should('not.exist')

    })

    it('preview functionality', () => {
        dataCy('create-open-addoptions-btn').click()
        dataCy('create-open-preview-btn').click()
        dataCy('create-preview').should('exist')
        dataCy('study-flashcards-box').trigger('keyup', {keyCode: 32})
        dataCy('study-side-display').contains('BACK')
        dataCy('study-flip-btn').click({force: true})
        dataCy('study-side-display').contains('FRONT')
        dataCy('study-flashcards-box').trigger('keyup', {keyCode: 39})
        validateCardInput(3)
        dataCy('study-previous-btn').click({force: true})
        validateCardInput(1)
        dataCy('study-progress-bar').invoke('width').should('eq', 360)
        dataCy('study-next-btn').click({force: true})
        validateCardInput(3)
        cy.wait(1500)
        dataCy('study-progress-bar').invoke('width').should('eq', 720)
        dataCy('study-flashcards-box').trigger('keyup', {keyCode: 37})
        validateCardInput(1)
        dataCy('study-next-btn').click({force: true})
        dataCy('study-check-btn').click({force: true})
        cy.wait(500)
        dataCy('create-preview').should('not.exist')

    })

    it ('saves deck', () => {
        dataCy('create-save-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').contains('h1','This is a Test Deck Title')
    })
       
        
    })


export const rteInput = (index: number) => {
    dataCy('rte-front-input').type(`hello ${index} front card`)
    dataCy('rte-back-input').type(`hello ${index} back card`)
}

const validateRteInput = (index: number) => {
    dataCy('rte-front-input').contains(`hello ${index} front card`)
    dataCy('rte-back-input').contains(`hello ${index} back card`)
}

const validateCardInput = (index: number) => {
    dataCy('study-front-card').contains(`hello ${index} front card`)
    dataCy('study-flashcards-box').trigger('keyup', {keyCode: 32})
    dataCy('study-back-card').contains(`hello ${index} back card`)
}