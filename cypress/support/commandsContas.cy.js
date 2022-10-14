
import loc from './locators.cy'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', conta => {
    cy.get(loc.CONTAS.NOME_CONTA).type('Conta teste')
    cy.get(loc.CONTAS.BTN_SALVAR).click()

})



      