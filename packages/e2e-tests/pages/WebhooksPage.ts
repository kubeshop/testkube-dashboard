import type {Page} from '@playwright/test';

export class WebhooksPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openCreateWebhookDialog(): Promise<void> {
    await this.page.click('xpath=//button[@data-test="webhooks-add-button"]');
  }

  public async openWebhookDetails(webhookName: string): Promise<void> {
    await this.page.click(`xpath=//div[contains(@data-test,"webhooks-list-item")]//span[text()="${webhookName}"]`);
  }
}
