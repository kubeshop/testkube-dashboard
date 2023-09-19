import type {Page} from '@playwright/test';

export class WebhooksPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateWebhookDialog(): Promise<void> {
    await this.page.click('xpath=//button//span[text()="Create a new webhook"]'); //TODO: data-test needed
  }

  public async openWebhookDetails(webhookName: string): Promise<void> {
    await this.page.click(`xpath=//span[text()="${webhookName}"]`); //TODO: data-test needed
  }
}
