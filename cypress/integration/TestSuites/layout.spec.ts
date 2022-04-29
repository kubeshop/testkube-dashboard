/// <reference types="cypress" />

describe('Test Suites Layout', () => {
  before(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', Cypress.env('endpoint'));
    });
  });

  it('location should contain test-suites', () => {
    cy.url().should('include', 'test-suites');
  });

  it('contains test-suites header', () => {
    cy.get('[data-cy=dashboard-title]').should('have.text', 'Test Suites');
  });

  it('should be selected test-suites navigation tab', () => {
    cy.get('[data-cy=navigation-tab]').contains('Test Suites').should('have.class', 'active');
  });

  it('contains test-suites in empty info panel', () => {
    expect(cy.get('[data-cy=empty-info-panel-text]').contains('test suite'));
  });
});

export {};
