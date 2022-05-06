/// <reference types="cypress" />

const baseEndpointUrl = Cypress.env('endpoint');

describe('Test Suites Content Table', () => {
  beforeEach(() => {
    cy.visit('/').then(() => {
      window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
    });
    cy.get('[data-cy=content-table]').get('tbody').as('table').should('be.visible');
    cy.get('[data-cy=filters-container').as('filters').should('be.visible');
  });

  // it('should request correct text search', () => {
  //   const searchText = 'fail';
  //   cy.get('[data-cy=search-filter]').type(searchText);

  //   cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?`, req => {
  //     expect(req.url).to.have.string(searchText);
  //   });
  // });

  // it('should clear search query when search field is cleared', () => {
  //   cy.get('[data-cy=search-filter]').type('fail');
  //   cy.wait(1100);

  //   cy.get('[data-cy=search-filter]').clear();

  //   cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?`, req => {
  //     expect(req.url).to.not.have.string('textSearch');
  //   });
  // });

  it('should apply labels filters', () => {
    const key = 'app';
    const value = 'sites';

    cy.get('[data-cy=labels-filter-button]').click();

    cy.get('[data-cy=labels-filter-dropdown]').type('app');
    // cy.get('[data-cy=abcv0]').type('sites');
    // cy.get('[data-cy=labels-filter-dropdown]').contains('Ok').click();

    // cy.get('[data-cy=labels-filter-dropdown]').should('not.exist');

    // cy.intercept(`${baseEndpointUrl}/test-suite-with-executions?`, req => {
    //   expect(req.url).to.have.string(`selector=${key}=${value}`);
    // });
  });
});

export {};
