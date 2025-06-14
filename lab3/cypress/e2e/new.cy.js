describe('Dodawanie', () => {
    it('Dodawanie nowej ksiązki', () => {
        cy.visit('https://bookshop-12345.web.app');

        cy.contains('Dodaj nową').click();

        cy.get('input[placeholder="Tytuł książki"]').type('test');
        cy.get('input[placeholder="Autor"]').type('abc');
        cy.get('input[placeholder="Cena"]').type('123');
        cy.get('input[placeholder="Liczba stron"]').type('123');

        cy.get('input[type="radio"][value="Twarda okładka"]').check();

        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'https://bookshop-12345.web.app/');
        cy.contains('test').should('exist');
        cy.contains('abc').should('exist');
    });
});
