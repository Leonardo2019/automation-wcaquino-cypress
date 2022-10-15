/// <reference types='cypress'/>

describe('Login barriga test', () => {
    let token
    // Cypress ._. times(5, () => {
    
    before(() => {
        cy.getToken('teste123@123.com', '97251617')
            .then(tkn => {
                token = tkn
            })

        // cy.login('teste123@123.com', '97251617')
        // cy.resetApp()

        // cy.visit('https://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type('teste123@123.com')
        // cy.get(loc.LOGIN.PASSWORD).type('97251617')
        
        // cy.get(loc.LOGIN.BTN_LOGIN).should('have.text', 'Entrar').click()
        // cy.get(loc.MESSAGE).should('have.text', 'Bem vindo, Leonardo teste!')
        
    })

    beforeEach(() => {
        cy.resetConta()
    })

    it('Inserir uma conta', () => {
        
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Authorization: `JWT  ${token}` },
                body: {
                    nome: 'Conta via rest'
                }
            }).as('response')
        
        cy.get('@response').then(resp => {
            expect(resp.status).to.be.equal(201)
            expect(resp.body).to.have.property('id')
            expect(resp.body).to.have.property('nome', 'Conta via rest')
        })
       
       
    })

    it('Alterar conta', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT  ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(resp => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${resp.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT  ${token}` },
                body: {
                    nome: 'Conta via rest alterada'
                }
            }).as('response')
        })
        
        cy.get('@response').its('status').should('be.equal', 200)

        
    })
    it('Não deve criar conta repetida', () => {

       
    })

    it('Criar uma transação', () => {
        

    })

    it('Deve pegar o saldo', () => {

        
    })

    it('Deve remover uma movimentação', () => {

        
    })

})

// })