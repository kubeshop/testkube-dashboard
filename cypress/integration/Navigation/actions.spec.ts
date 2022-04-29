/// <reference types="cypress" />

describe('Navigation Actions', () => {
  beforeEach(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', Cypress.env('endpoint'));
    });
    cy.get('[data-cy=navigation-sider]').as('navigation').should('be.visible');
  });

  it('redirects to test-suites', () => {
    cy.get('@navigation').contains('Test Suites').click();
    cy.url().should('include', 'test-suites');
  });

  it('redirects to tests', () => {
    cy.get('@navigation').contains('Tests').click();
    cy.url().should('include', 'tests');
  });

  it('opens modal', () => {
    cy.get('@navigation').get('[data-cy=Settings]').click();
    cy.get('[data-cy=modal-api-endpoint]').should('be.visible');
  });
});

export {};
