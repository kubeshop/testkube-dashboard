/// <reference types="cypress" />

describe('Test Suites Layout', () => {
  before(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', Cypress.env('endpoint'));
    });
  });

  it('location and title should be test suites', () => {
    cy.url().should('include', 'test-suites');
    cy.get('[data-cy=dashboard-title]').should('have.text', 'Test Suites');
  });

  it('should be selected test-suites navigation tab', () => {
    cy.get('[data-cy=navigation-tab]').contains('Test Suites').should('have.class', 'active');
  });

  it('should contain test-suites in empty info panel', () => {
    expect(cy.get('[data-cy=empty-info-panel-text]').contains('test suite'));
  });
});

export {};
