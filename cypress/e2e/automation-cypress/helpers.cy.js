/// <reference types='cypress'/>


describe('Helpers', () => {
    // Cypress ._. times(5, () => {

    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')

        cy.wrap(obj).should('have.property', 'nome')
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').then($el => {
            // $el.val('Funciona')
            cy.wrap($el).type('Funciona')
        })

    })
    it('Its', () => {
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
    })
    
})


