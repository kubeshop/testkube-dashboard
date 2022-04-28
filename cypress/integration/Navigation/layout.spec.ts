/// <reference types="cypress" />
import { getBaseUrl } from '../../support/utils';

const url = getBaseUrl();

describe('Navigation Layout', () => {
  before(() => {
    cy.visit(url).then(() => {
      window.localStorage.setItem('apiEndpoint', Cypress.env('endpoint'));
    });
  });

  beforeEach(() => {
    cy.get('[data-cy=navigation-sider]').as('navigation').should('be.visible');
  });

  it('displays routes', () => {
    expect(cy.get('@navigation').contains('Test Suites'));
    expect(cy.get('@navigation').contains('Tests'));
  });

  it('displays sider when screen is small', () => {
    cy.viewport('macbook-13');
    cy.get('@navigation').should('have.css', 'width', '80px').and('have.css', 'height', '800px');
  });

  it('displays sider when screen is big', () => {
    cy.viewport(2560, 1650);
    cy.get('@navigation').should('have.css', 'width', '80px').and('have.css', 'height', '1650px');
  });
});
