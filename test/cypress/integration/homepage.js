const { createVerify } = require("crypto");

describe('The Home Page', () => {
  it('check if there are some entries on grid', () => {
    cy.visit('https://demo.testkube.io');
    cy.wait(2000);

    // check if there is some data on grid (need to be more sophisticated)
    cy.get("td[role='cell'").then(cells => {
      const count = Cypress.$(cells).length;
      expect(count).to.be.greaterThan(0);
    });
  });

  it('homepage asks for URI', () => {
    cy.get("[aria-label='setting']").click();
    cy.wait(500);
    cy.contains('TestKube API endpoint');
    cy.get('#url').type('https://demo.testkube.io/results');
    cy.get("button[type='submit']").click();
  });
});
