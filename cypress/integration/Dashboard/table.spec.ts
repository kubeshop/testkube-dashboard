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

  it('should display no data', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, []);
    expect(cy.get('@table').contains('No Data'));
  });

  it('should display correct data', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, {fixture: 'test-suites.json'});
    cy.get('@table').get('tbody').children().should('have.length', testSuites.length);
  });

  it('should not display pagination', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, {fixture: 'test-suites.json'});
    cy.get('@table').contains('.ant-pagination').should('not.exist');
  });

  it('should display pagination and correct number of items', () => {
    cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?*`, Array(12).fill(testSuites[0]));
    cy.get('@table').get('.ant-pagination').should('exist');

    cy.get('@table').get('tbody').children().should('have.length', 10);
    cy.get('@table').get('.ant-pagination').contains('2').click({force: true});

    cy.get('@table').get('tbody').children().should('have.length', 2);
  });

  it('should redirect to add test', () => {
    cy.visit('/dashboard/tests');

    cy.intercept(`${baseEndpointUrl}/test-with-executions?*`, []);
    cy.get('[data-cy=empty-tests-data]').should('exist');

    cy.get('[data-cy=empty-tests-data]').get('[data-cy=add-test-button]').click();

    cy.url().should('include', 'add-test');
  });
});

export {};
