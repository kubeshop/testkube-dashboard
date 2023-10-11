import type {Page} from '@playwright/test';

import type {WebhookData} from '../types';

export class CreateWebhookPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createWebhook(webhookData: WebhookData): Promise<void> {
    await this.setBasicInput(webhookData.name, 'name');
    await this.selectResourceIdentifier(webhookData.selector);
    await this.selectTriggeredEvents(webhookData.events);

    await this.clickNextButton();
    await this.setBasicInput(webhookData.uri, 'uri');
    await this.clickCreateWebhookButton();
  }

  async setBasicInput(value: string | number, inputName: string): Promise<void> {
    await this.page.locator(`[id="webhook-creation-modal_${inputName}"]`).fill(`${value}`);
  }

  async clickNextButton() {
    await this.page.click('//button[@data-test="webhooks-add-modal-next:first"]');
  }

  async clickCreateWebhookButton() {
    await this.page.click('//button[@data-test="webhooks-add-modal-next:second"]');
  }

  async selectResourceIdentifier(resources: Record<string, string>): Promise<void> {
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]';
    const multiSelectInputSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]//input';

    await this.selectLabels(resources, multiSelectElementSelector, multiSelectInputSelector);
  }

  async selectTriggeredEvents(events: string[]): Promise<void> {
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_events"]';

    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of events) {
      await this.selectMultiSelectValue(eventName, multiSelectElementSelector); // eslint-disable-line no-await-in-loop
    }
  }

  async selectMultiSelectValue(value: string, multiSelectElement: string): Promise<void> {
    await this.page.click(multiSelectElement);
    await this.page.locator(`${multiSelectElement}//input`).fill(value);

    await this.page.click(`${multiSelectElement}//div[contains(@class,"option") and text()="${value}"]`);
  }

  async selectLabels(
    labels: Record<string, string>,
    labelSelectElement: string,
    labelSelectInputElement: string
  ): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of Object.entries(labels)) {
      await this.selectCreateLabel(`${name}:${value}`, labelSelectElement, labelSelectInputElement); // eslint-disable-line no-await-in-loop
    }
  }

  async selectCreateLabel(value: string, multiSelectElement: string, multiSelectInputSelector: string): Promise<void> {
    await this.page.click(multiSelectElement);
    await this.page.locator(multiSelectInputSelector).fill(value);

    await this.page.keyboard.press('Enter');
  }
}
