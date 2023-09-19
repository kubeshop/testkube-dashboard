import type {Page} from '@playwright/test';

import type {WebhookData} from '../types';

export class CreateWebhookPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createWebhook(webhookData: Partial<WebhookData>): Promise<void> {
    //TODO
  }

  public async createTestSource(webhookData: WebhookData): Promise<void> {
    await this.setBasicInput(webhookData.name, 'name');
    //id: webhook-creation-modal_selector
    //id: webhook-creation-modal_events

    await this.clickNextButton();
    await this.setBasicInput(webhookData.uri, 'uri');
    await this.clickCreateWebhookButton();
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> { //TODO: move to common helpers
    await this.page.locator(`[id="webhook-creation-modal_${inputName}"]`).fill(`${value}`);
  }
}
