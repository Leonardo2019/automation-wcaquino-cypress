/// <reference types='cypress'/>

import loc from '../../support/locators.cy'


describe('Login barriga test', () => {
    // Cypress ._. times(5, () => {
    
    before(() => {
        
        cy.login('teste123@123.com', '97251617')
        cy.resetApp()

        // cy.visit('https://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type('teste123@123.com')
        // cy.get(loc.LOGIN.PASSWORD).type('97251617')
        
        // cy.get(loc.LOGIN.BTN_LOGIN).should('have.text', 'Entrar').click()
        // cy.get(loc.MESSAGE).should('have.text', 'Bem vindo, Leonardo teste!')
        
    })

    it('Inserir uma conta', () => {
        
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.get(loc.CONTAS.NOME_CONTA).type('Conta teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
        
    })

    it('Alterar conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        // cy.xpath("//table//td[contains(., 'Conta teste')]/..//i[@class='far fa-edit']").click()
        cy.get(loc.CONTAS.GET_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME_CONTA).clear()
            .type('Conta alterada')

        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
            
        
    })
    it('Não deve criar conta repetida', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.get(loc.CONTAS.NOME_CONTA).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })

    it('Criar uma transação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100.00',{timeout: 8000})
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Remover conta', {timeout: 6000})
        cy.get(loc.MOVIMENTACAO.STATUS).click({timeout: 6000})
        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click({timeout: 8000})
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!', {timeout: 8000})

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.get(loc.EXTRATO.GET_BUSCA_ELEMENTO).should('exist', {timeout: 8000})
    })

    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.get(loc.SALDO.GET_SALDO_CONTA).should('contain', '100,00',{timeout: 8000})
    })

    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click({timeout: 8000})
        cy.get(loc.EXTRATO.GET_REMOVER_ELEMENTO).click({timeout: 8000})
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!',{timeout: 8000})
    })

})

// })