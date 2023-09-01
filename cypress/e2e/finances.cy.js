/// <reference types="cypress" />

describe('Transações', () => {
    beforeEach(() => {
        cy.visit('https://dev-finance.netlify.app/');
    });
    it('Cadastrar uma entrada', () => {
        criarTransacao('Freela', '500');
        
        cy.get('tbody tr td.description').should('have.text', 'Freela');
    });

    it('Cadastrar uma saida', () => {
        criarTransacao('Cineminha', '-50');
        cy.get('tbody tr td.description').should('have.text', 'Cineminha');
    });

    it('Cadastrar uma saida e uma entrada', () => {
        criarTransacao('Freela', '500');
        criarTransacao('Cineminha', '-50');

        cy.get('tbody tr').should('have.length', '2');
        cy.get('tbody tr td.description').first().should('have.text', 'Freela');
        cy.get('tbody tr td.description').last().should('have.text', 'Cineminha');
    });
    
    it('Excluir transação', () => {
        criarTransacao('Freela', '500')
        criarTransacao('Mesada', '20')
        cy.contains('.description', 'Freela').parent().find('img').click();
    
        cy.get('tbody tr').should('have.length', '1');
    });
});

function criarTransacao(descricao, valor){
    cy.get('#transaction > .button').click();
    cy.get('#description').type(descricao);
    cy.get('#amount').type(valor);
    cy.get('#date').type("2023-08-15");
    cy.get('button').click();
}