import {testID, dataCy} from '../../support/utils'
//2bd4aa66e3a34a278be0587ffb40af59

describe('imports deck from another account via Deck ID', () => {
    before(() => {
        cy.login()
    })

    it('access deck ID import screen', () => {
        dataCy('create-btn').click()
        dataCy('import-id-btn').click()
        cy.url().should('contain', 'modal-import')
    })

    it('imports deck with modal closing', () => {
        dataCy('import-id-input').type('2bd4aa66e3a34a278be0587ffb40af59')
        dataCy('import-id-btn').click()
        cy.url().should('not.contain', "modal-import")
        dataCy('import-id-input').should('not.exist')
    })

    it ('import deck shows up on screen', () => {
        dataCy('sidebar-cards-btn').click()
        dataCy('home-mycards-container').find('h1').contains('Imported Deck Test 1')
    })

    it ('imported deck contains a different ID', () => {
        dataCy('deck-share-btn').click()
        dataCy('deck-share-id-btn').click()
        cy.url().should('contain', 'modal=modal-share')
        dataCy('share-id').should('not.eq', '2bd4aa66e3a34a278be0587ffb40af59')
        
    })
})