describe('The Home Page', () => {
  it('Go to dashboard', () => {
    cy.visit('https://demo.testkube.io/apiEndpoint?apiEndpoint=https://demo.testkube.io/results/v1');
  });

  it('Test suites should be shown as default view', () => {
    cy.get('h1').should('have.text', 'Test Suites ');
  });

  it('Load test suite executions list', () => {
    cy.get('a[href="/dashboard/test-suite-executions"]:first').click();
    cy.get('h1').should('have.text', 'Test Suite Executions ');
  });

  it('Load tests list', () => {
    cy.get('a[href="/dashboard/tests"]:first').click();
    cy.get('h1').should('have.text', 'Tests ');
  });

  it('Load executions list', () => {
    cy.get('a[href="/dashboard/executions"]:first').click();
    cy.get('h1').should('have.text', 'Executions ');
  });
});
