import type {Page} from '@playwright/test';

export class ExecutorsPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateExecutorDialog(): Promise<void> {
    await this.page.click('xpath=//button//span[contains(text(),"Create a new executor")]'); // TODO: data-test
  }

  public async openExecutorSettings(executorName: string): Promise<void> {
    await this.page.click(`xpath=//div/span[text()="${executorName}"]`);
  }
}
