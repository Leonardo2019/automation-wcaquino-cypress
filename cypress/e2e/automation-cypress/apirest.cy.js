/// <reference types='cypress'/>

const dayjs = require('dayjs')

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
        cy.getContaByName('Conta para alterar')
        // cy.request({
        //     method: 'GET',
        //     url: 'https://barrigarest.wcaquino.me/contas',
        //     headers: { Authorization: `JWT  ${token}` },
        //     qs: {
        //         nome: 'Conta para alterar'
        //     }
        .then(contaId => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${contaId}`,
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
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT  ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
    
    cy.get('@response').then(resp => {
        expect(resp.status).to.be.equal(400)
        expect(resp.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })

       
    })

    it('Criar uma transação', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: 'https://barrigarest.wcaquino.me/transacoes',
                headers: { Authorization: `JWT  ${token}` },
                body: {
                    conta_id: contaId,
                    // data_pagamento: '17/10/2022',
                    // data_transacao: '17/10/2022',
                    data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                    data_transacao: dayjs().format('DD/MM/YYYY'),
                    descricao: 'desc',
                    envolvido: 'inter',
                    status: true,
                    tipo: 'REC',
                    valor: '100'
               
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
        

    })

    it('Deve trazer saldo', () => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/saldo',
            method: 'GET',
            headers: { Authorization: `JWT  ${token}` },

        }).then(resp => {
            let saldoConta = null
            resp.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: { Authorization: `JWT  ${token}` },
            qs: {descricao: 'Movimentacao 1, calculo saldo'}

        }).then(resp => { 
            console.log(resp.body[0])

            cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${resp.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT  ${token}` },
                body: {
                    status: true,
                    data_transacao: dayjs(resp.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(resp.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: resp.body[0].descricao,
                    envolvido: resp.body[0].envolvido,
                    valor: resp.body[0].valor,
                    conta_id: resp.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: 'https://barrigarest.wcaquino.me/saldo',
            method: 'GET',
            headers: { Authorization: `JWT  ${token}` },

        }).then(resp => {
            let saldoConta = null
            resp.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
        
    })

    it('Deve remover uma movimentação', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: { Authorization: `JWT  ${token}` },
            qs: {descricao: 'Movimentacao para exclusao'}

        }).then(resp => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${resp.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `JWT  ${token}` },

            }).its('status').should('be.equal', 204)
        }) 
        
    })

})



// })