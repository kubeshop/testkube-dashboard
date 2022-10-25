/// <reference types="cypress" />
import testSuites from '../../fixtures/test-suites.json';

const baseEndpointUrl = Cypress.env('endpoint');

describe('Test Suites Content Table', () => {
  beforeEach(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
    });
    cy.get('[data-cy=content-table]').as('table').should('be.visible');
  });

  it.skip('should display no data', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, []);
    expect(cy.get('@table').contains('No Data'));
  });

  it.skip('should display correct data', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, {fixture: 'test-suites.json'});
    cy.get('@table').get('tbody').children().should('have.length', testSuites.length);
  });

  it.skip('should not display pagination', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, {fixture: 'test-suites.json'});
    cy.get('@table').contains('.ant-pagination').should('not.exist');
  });

  it.skip('should display pagination and correct number of items', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, Array(12).fill(testSuites[0]));
    cy.get('@table').get('.ant-pagination').should('exist');

    cy.get('@table').get('tbody').children().should('have.length', 10);
    cy.get('@table').get('.ant-pagination').contains('2').click({force: true});

    cy.get('@table').get('tbody').children().should('have.length', 2);
  });
});

export {};
