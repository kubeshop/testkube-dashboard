import type {Page} from '@playwright/test';

export class TestSuitesPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateTestSuiteDialog(): Promise<void> {
    await this.page.click('button[data-test="add-a-new-test-suite-btn"]');
  }

  public async openTestSuiteExecutionDetails(testSuiteName: string): Promise<void> {
    await this.page.locator(`input[data-cy="search-filter"]`).fill(testSuiteName);
    await this.page.click(`xpath=//div[@data-test="test-suites-list-item" and .//span[text()="${testSuiteName}"]]`);
  }
}
