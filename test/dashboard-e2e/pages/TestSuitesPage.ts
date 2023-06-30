import type { Page } from  '@playwright/test';

export class TestSuitesPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async openCreateTestSuiteDialog() {
      await this.page.click('button[data-test="add-a-new-test-suite-btn"]');
    }

    async openTestSuiteExecutionDetails(realTestSuiteName) {
      await this.page.locator(`input[data-cy="search-filter"]`).fill(realTestSuiteName);
      await this.page.click(`xpath=//div[@data-test="test-suites-list-item" and .//span[text()="${realTestSuiteName}"]]`);
    }
}