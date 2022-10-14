const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        HOME: '[data-test="menu-home"] > .fas',
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"] > .fas',
        EXTRATO: '[data-test="menu-extrato"] > .fas'

    },

    CONTAS: {
        NOME_CONTA: '[data-test="nome"]',
        BTN_SALVAR: '.btn',
        GET_BTN_ALTERAR: ':nth-child(7) > :nth-child(2) > :nth-child(1) > .far'
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        STATUS: '[data-test="status"]',
        BTN_SALVAR: '.btn-primary',
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        GET_BUSCA_ELEMENTO: ':nth-child(7) > .row > .col-12 > :nth-child(1)',
        GET_REMOVER_ELEMENTO: ':nth-child(7) > .row > .col > [href="#"] > .far'
    },

    SALDO: {
        GET_SALDO_CONTA: 'tbody > :nth-child(1) > :nth-child(2)'
    },

    MESSAGE: '.toast-message',
}

export default locators;