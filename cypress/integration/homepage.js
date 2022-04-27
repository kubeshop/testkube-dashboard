/// <reference types="cypress" />
import { getBaseUrl } from '../support/utils';

const url = getBaseUrl();

describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('Test suites should be shown as default view', () => {
    cy.get('h1').should('have.text', 'Test Suites');
  });
});
