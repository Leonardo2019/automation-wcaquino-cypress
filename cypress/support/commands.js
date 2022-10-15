// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loc from './locators.cy'

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type('teste123@123.com')
    cy.get(loc.LOGIN.PASSWORD).type('97251617')
    
    cy.get(loc.LOGIN.BTN_LOGIN).should('have.text', 'Entrar').click()
    cy.get(loc.MESSAGE).should('have.text', 'Bem vindo, Leonardo teste!')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',

        body: {
            email: user,
            redirecionar: false,
            senha: passwd
            }

    }).its('body.token').should('not.be.empty')
    .then(token => {
        return token
    })
})

Cypress.Commands.add('resetConta', () => {
    cy.getToken('teste123@123.com', '97251617').then(token => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization: `JWT  ${token}` },
        }).its('status').should('be.equal', 200)

    })
   
})