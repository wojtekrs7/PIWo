describe('Filtrowanie książek', () => {
    it('Nie zwraca żadnych książek przy nieistniejącym tytule', () => {
        cy.visit('https://bookshop-12345.web.app/');

        cy.get('input[placeholder="Szukaj po tytule"]').type('XXXXXXXXX');

        cy.get('.results').find('article').should('have.length', 0);
    });

    it('Nie zwraca książek przy błędnej cenie', () => {
        cy.visit('https://bookshop-12345.web.app/');

        cy.get('input[placeholder="Min. cena"]').type('9999');
        cy.get('input[placeholder="Max. cena"]').type('10000');

        cy.get('.results').find('article').should('have.length', 0);
    });

    it('Nie zwraca książek przy błędnej liczbie stron', () => {
        cy.visit('https://bookshop-12345.web.app/');

        cy.get('input[placeholder="Min. liczba stron"]').type('9999');

        cy.get('.results').find('article').should('have.length', 0);
    });
});
