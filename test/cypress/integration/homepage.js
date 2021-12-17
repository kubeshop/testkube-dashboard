describe('The Home Page', () => {
  it('check if the table is renderer there', () => {
    cy.visit('https://demo.testkube.io/apiEndpoint?apiEndpoint=https://demo.testkube.io/results/v1');
    cy.get('a[href="/dashboard/scripts"]').click({multiple: true, force: true});
    cy.wait(2000);
    cy.get('.ant-table-tbody');
  });
});
