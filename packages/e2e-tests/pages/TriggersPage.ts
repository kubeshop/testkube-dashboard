import type {Page} from '@playwright/test';

export class TriggersPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateTriggerDialog(): Promise<void> {
    await this.page.click('xpath=//button[@data-test="triggers-add-button"]');
  }

  public async openTriggerDetails(triggerName: string): Promise<void> {
    await this.page.click(`xpath=//div[@data-test="triggers-list-item:${triggerName}"]`);
  }
}
