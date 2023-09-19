import type {Page} from '@playwright/test';

export class TriggersPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateTriggerDialog(): Promise<void> {
    await this.page.click('xpath=//button//span[text()="Create a new trigger"]'); //TODO: data-test needed
  }

  public async openTriggerDetails(triggerName: string): Promise<void> {
    await this.page.click(`xpath=//span[text()="${triggerName}"]`); //TODO: data-test needed
  }
}
