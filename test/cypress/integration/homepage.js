const { createVerify } = require("crypto");

describe('The Home Page', () => {
  it('homepage asks for URI', () => {
    cy.visit('https://dashboard.testkube.io');
    cy.contains('Please provide the TestKube API endpoint for your installation, which will have been provided to you by the TestKube installer.');

    cy.get('#url').type('https://demo.testkube.io/results/v1/executions');
    cy.get("button[type='submit']").click();

    cy.wait(2000);

    // check if there is some data on grid (need to be more sophisticated)
    cy.get("div[role='cell'").then(cells => {
      const count = Cypress.$(cells).length;
      expect(count).to.be.greaterThan(0);
    });

    cy.contains("long-1");
  });
});
