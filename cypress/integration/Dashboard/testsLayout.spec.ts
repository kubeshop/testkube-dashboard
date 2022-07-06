/// <reference types="cypress" />

const baseEndpointUrl = Cypress.env('endpoint');

describe('Tests Dashboard Layout', () => {
  before(() => {
    cy.visit('/dashboard/tests').then(() => {
      window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
    });
  });
  it('location and title should be tests', () => {
    cy.url().should('include', 'tests');
    cy.get('[data-cy=dashboard-title]').should('include.text', 'Tests');
  });

  it('should not be selected tests navigation tab', () => {
    cy.get('[data-cy=navigation-tab]').contains('Tests').should('have.class', 'active');
  });

  it('should contain test-suites in empty info panel', () => {
    expect(cy.get('[data-cy=empty-info-panel-text]').contains('test'));
  });
});

export {};
