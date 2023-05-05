/// <reference types="cypress" />

const baseEndpointUrl = Cypress.env('endpoint');

const entities: {baseName: string; apiName: string}[] = [
  {baseName: 'test-suites', apiName: 'test-suite'},
  {baseName: 'tests', apiName: 'test'},
];

entities.forEach(entity => {
  describe(`[${entity.baseName}] Content Filters`, () => {
    beforeEach(() => {
      cy.visit(`/dashboard/${entity.baseName}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=filters-container').as('filters').should('be.visible');
    });

    it(`[${entity.baseName}] - should request correct text search`, () => {
      const searchText = 'fail';
      cy.get('[data-cy=search-filter]').type(searchText);

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(searchText);
      });
      // cy.wait('@request').its('request.url').should('include', searchText);
    });

    it(`[${entity.baseName}] - should clear search query when search field is cleared`, () => {
      cy.get('[data-cy=search-filter]').type('fail');
      cy.get('[data-cy=search-filter]').clear();

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.not.contain('textSearch');
      });
      // cy.wait('@request').its('request.url').should('not.include', 'textSearch');
    });

    it(`[${entity.baseName}] - should apply labels filters`, () => {
      const key = 'app';
      const value = 'sites';

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('[data-cy=key-input-0]').first().type(key);
      cy.get('[data-cy=value-input-0]').first().type(value);
      cy.get('@dropdown').contains('Ok').click();

      cy.get('@dropdown').should('not.be.visible');

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`selector=${key}%3D${value}`);
      });
      // cy.wait('@request').its('request.url').should('include', `selector=${key}%3D${value}`);
    });

    it(`[${entity.baseName}] - should apply multiple labels`, () => {
      const key0 = 'app';
      const value0 = 'sites';
      const key1 = 'sample-key';
      const value1 = 'value1';

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('[data-cy=key-input-0]').first().type(key0);
      cy.get('[data-cy=value-input-0]').first().type(value0);

      cy.get('@dropdown').contains('Add row').click();

      cy.get('[data-cy=key-input-1]').first().type(key1);
      cy.get('[data-cy=value-input-1]').first().type(value1);
      cy.get('@dropdown').contains('Ok').click();

      cy.get('@dropdown').should('not.be.visible');

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`selector=${key0}%3D${value0}%2C${key1}%3D${value1}`);
      });
    });

    it(`[${entity.baseName}] - should remove labels when row is removed`, () => {
      const key = 'app';
      const value = 'sites';
      const key1 = 'app1';
      const value1 = 'sites1';

      cy.visit(`/dashboard/${entity.baseName}?selector=${key}%3D${value}%2C${key1}%3D${value1}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');
      cy.get('[data-cy=delete-row-1]').first().click();
      cy.get('@dropdown').contains('Ok').click();

      cy.url().should('not.include', key1);
    });
    it(`[${entity.baseName}] - should fulfill inputs when selector is provided with url`, () => {
      const key = 'app';
      const value = 'sites';

      cy.visit(`/dashboard/${entity.baseName}?selector=${key}%3D${value}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('[data-cy=key-input-0]').first().should('have.value', key);
      cy.get('[data-cy=value-input-0]').first().should('have.value', value);

      // header, key-value labels, add row button and 1 key-value inputs pair
      cy.get('@dropdown').children().first().children().should('have.length', 4);
    });

    it(`[${entity.baseName}] - should reset labels filter`, () => {
      const key = 'app';
      const value = 'sites';

      cy.visit(`/dashboard/${entity.baseName}?selector=${key}%3D${value}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('@dropdown').contains('Reset').click();

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.not.contain(`selector=${key}%3D${value}`);
      });
      // cy.wait('@request').its('request.url').should('not.include', `selector=${key}%3D${value}`);

      cy.get('@dropdown').contains('Cancel').click();
      cy.get('@dropdown').should('not.be.visible');
    });

    it(`[${entity.baseName}] - should bot apply filters`, () => {
      const key = 'app';

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('[data-cy=key-input-0]').first().type(key);
      cy.get('@dropdown').contains('Ok').click();

      cy.get('@dropdown').should('not.be.visible');

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`selector=${key}`);
      });
      // cy.wait('@request').its('request.url').should('include', `selector=${key}`);
    });

    it(`[${entity.baseName}] - should apply only key selector`, () => {
      const value = 'sites';

      cy.get('[data-cy=labels-filter-button]').click();
      cy.get('[data-cy=labels-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('[data-cy=value-input-0]').first().type(value);
      cy.get('@dropdown').contains('Ok').click();

      cy.get('@dropdown').should('not.be.visible');

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.not.contain(`selector=${value}`);
      });
      // cy.wait('@request').its('request.url').should('not.include', `selector=${value}`);
    });

    it(`[${entity.baseName}] - should apply status filter`, () => {
      const status = 'passed';
      cy.get('[data-cy=status-filter-button]').click();
      cy.get('[data-cy=status-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get(`[data-cy=${status}]`).check();

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`status=${status}`);
      });
      // cy.wait('@request').its('request.url').should('include', `status=${status}`);

      cy.get('@dropdown').contains('Ok').click();
      cy.get('@dropdown').should('not.be.visible');
    });

    it(`[${entity.baseName}] - should apply multiple statuses filter`, () => {
      const status1 = 'passed';
      const status2 = 'failed';

      cy.get('[data-cy=status-filter-button]').click();
      cy.get('[data-cy=status-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get(`[data-cy=${status1}]`).check();
      cy.get(`[data-cy=${status2}]`).check();

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`status=${status1}%2C${status2}`);
      });
      // cy.wait('@request').its('request.url').should('include', `status=${status1}%2C${status2}`);
    });

    it(`[${entity.baseName}] - should check statuses when status is provided with url`, () => {
      const status1 = 'passed';
      const status2 = 'running';

      cy.visit(`/dashboard/${entity.baseName}?status=${status1}%2C${status2}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=status-filter-button]').click();
      cy.get('[data-cy=status-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get(`[data-cy=${status1}]`).should('be.checked');
      cy.get(`[data-cy=${status2}]`).should('be.checked');

      cy.get(`[data-cy=${status2}]`).check();

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.contain(`status=${status1}`);
      });
      // cy.wait('@request').its('request.url').should('include', `status=${status1}`);
    });

    it(`[${entity.baseName}] - should remove status`, () => {
      const status1 = 'passed';
      const status2 = 'failed';

      cy.visit(`/dashboard/${entity.baseName}?status=${status1}%2C${status2}`).then(() => {
        window.localStorage.setItem('apiEndpoint', baseEndpointUrl);
      });

      cy.get('[data-cy=status-filter-button]').click();
      cy.get('[data-cy=status-filter-dropdown]').as('dropdown').should('be.visible');

      cy.get('@dropdown').contains('Reset').click();
      cy.get('@dropdown').should('be.visible');

      cy.get('@dropdown').contains('Ok').click();
      cy.get('@dropdown').should('not.be.visible');

      cy.intercept(`${baseEndpointUrl}/${entity.apiName}-with-executions?*`, req => {
        expect(req.url).to.not.contain(`status=${status1}%2C${status2}`);
      });
      // cy.wait('@request').its('request.url').should('not.include', `status=${status1}%2C${status2}`);
    });
  });
});

export {};
