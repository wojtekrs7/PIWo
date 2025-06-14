describe('Strona główna', () => {
  it('Ładuje się poprawnie', () => {
    cy.visit('https://bookshop-12345.web.app/');
    cy.contains('Dodaj nową').should('exist');
  });

  it('Filtruje książki po tytule', () => {
    cy.visit('https://bookshop-12345.web.app/');
    cy.get('input[placeholder="Szukaj po tytule"]').type('Harry');
    cy.get('.results article').each(($el) => {
      cy.wrap($el).should('contain.text', 'Harry');
    });
  });
});
