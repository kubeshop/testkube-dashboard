import type {Page} from '@playwright/test';

export class TestSourcesPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateTestSourceDialog(): Promise<void> {
    await this.page.click('xpath=//button//span[contains(text(),"Create a new source")]'); // TODO: data-test
  }

  public async openTestSourceDetails(testSourceName: string): Promise<void> {
    await this.page.click(`xpath=//div/span[text()="${testSourceName}"]`);
  }
}
