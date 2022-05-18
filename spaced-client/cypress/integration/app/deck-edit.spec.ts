import { testID, dataCy } from "../../support/utils";

describe('deck edit', () => {
    before(() => {
        cy.login()
    })

    it('able to access edit screen', () => {
        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').find('h1').contains('This is a Test Deck Title').get(testID('deck-edit-btn')).click()
        cy.url().should('contains', 'http://localhost:3000/u/edit')
    })

    it('data is persisted in edit details', () => {
        dataCy('create-deck-title-input').should('have.value', 'This is a Test Deck Title')
        dataCy('create-deck-desc-input').should('have.value', 'This is a Test Deck Desc')
        dataCy('create-deck-number-input').should('have.value', 3)
    })

    it('editing details', () => {
        dataCy('create-deck-title-input').clear().type('This is an Edited Title')
        dataCy('create-deck-desc-input').clear().type('This is an Edited Desc')
        dataCy('create-deck-number-input').clear().type('5')
        dataCy('create-deck-next-btn').click()
    })

    it('edit cards text', () => {
        rteInput(1)
        dataCy('create-next-card-btn').click()
        rteInput(2)
        dataCy('create-add-card-btn').click()
        rteInput(3)
    })

    it('deck is successfully saved', () => {
        dataCy('create-save-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').find('h1').contains('This is an Edited Title')
    })

    it ('deletes deck', () => {
        dataCy('deck-delete-btn').click()
        cy.url().should('contain', 'modal=modal-delete')
        dataCy('modal-delete-btn').click()
        cy.url().should('eq', 'http://localhost:3000/u/home')
        dataCy('home-mycards-container').find('h1').should('not.exist')
        
    })
})

const rteInput = (index: number) => {
    dataCy('rte-front-input').type(`bye ${index} front card`)
    dataCy('rte-back-input').type(`bye ${index} back card`)

}