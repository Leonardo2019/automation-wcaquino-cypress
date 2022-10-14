/// <reference types='cypress'/>

describe('Esperas...', () => {
    // Cypress ._. times(5, () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    it('Deve aguardar elemento disponivel', () => {
        cy.get('#novoCampo').should('not.exist')

        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funciona')
    })

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
        
    })

    it('Uso do Find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li').find('span').should('contain', 'Item 1')

        cy.get('#lista li span').should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', {timeout: 10000}).should('have.length', '2', )
    })

    it('Click retry', () => {
        cy.get('#buttonCount').click().should('have.value', '1')
    })

    it('Should vs Then', () => {
        // cy.get('#buttonListDOM').click()
        cy.get('#buttonListDOM').then($el => {
            // console.log($el)
            expect($el).to.have.length(1)

        }).and('have.id', 'buttonListDOM')
    })
    
})

