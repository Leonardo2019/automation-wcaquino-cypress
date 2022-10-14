/// <reference types="cypress"/>

describe('Cypress basic', () => {
    // Cypress._.times(5,() => {

    
    it('Visit page e and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().debug().should('contain', 'Campo')

        cy.title().should('be.equal', 'Campo de Treinamento')
                  .and('contain', 'Campo')

        // cy.title().then(title => {
        //     console.log(title)
        // })

    })

    it('Shoud find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click()
            .should('have.value', 'Obrigado!')
    })
})

