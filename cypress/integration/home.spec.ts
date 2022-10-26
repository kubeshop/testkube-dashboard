/// <reference types="cypress" />

describe('Navigation Layout', () => {
  before(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', Cypress.env('endpoint'));
    });
  });

  it('opens dashboard with tests', () => {
    cy.url().should('include', 'tests');
    expect(cy.contains('Tests'));
  });
});

export {};
