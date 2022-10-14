/// <reference types='cypress'/>


describe('Work with basic elements', () => {
    // Cypress._.times(5,() => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload()
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')

    })

    it('TextFields', () => {
        cy.get('#formNome').type('Teste texto').should('have.value', 'Teste texto')

        cy.get('#elementosForm\\:sugestoes').type('Teste texto').should('have.value', 'Teste texto')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('Qualquer coisa')
        
        cy.get('[data-cy="dataSobrenome"]').type('teste1234{backspace}')
            .should('have.value', 'teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Teste texto novo{selectall}acerto', {delay:100})
            .should('have.value', 'acerto')
    })
    it('RadioButton', () => {
        cy.get('#formSexoFem').click()
            .should('be.checked')

            cy.get('#formSexoMasc').should('not.be.checked')
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza').click()
            .should('be.checked')

            cy.get('[name=formComidaFavorita]').click({multiple:true})
            cy.get('#formComidaPizza').click().should('be.checked')
            cy.get('#formComidaVegetariana').click().should('not.be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

            cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp')
            .should('have.value', '1graucomp')
    })

    it('Combo Multiplo', () => {
        cy.get('[data-testid="dataEsportes"]').select(['natacao', 'Corrida'])
    })

    
})

