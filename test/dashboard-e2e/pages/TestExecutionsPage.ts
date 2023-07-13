import type {Page} from '@playwright/test';

export class TestExecutionsPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async runTest(): Promise<void> {
    await this.page.click('//span[@class="ant-page-header-heading-extra"]//button[.//span]'); // TODO: data-test needed
  }

  public async openExecutionDetails(executionName: string): Promise<void> {
    await this.page.click(`xpath=//tr[.//span[text()="${executionName}"]]`);
  }
}
