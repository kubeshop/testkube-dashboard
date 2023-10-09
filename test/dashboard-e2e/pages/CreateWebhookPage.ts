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
    //TODO: move to common helpers
    await this.page.locator(`[id="webhook-creation-modal_${inputName}"]`).fill(`${value}`);
  }

  async clickNextButton() {
    await this.page.click('//button//span[text()="Next"]'); //TODO: data-test
  }

  async clickCreateWebhookButton() {
    await this.page.click('//button//span[text()="Submit"]'); //TODO: data-test
  }

  async selectResourceIdentifier(resources: Record<string, string>): Promise<void> {
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]';
    const multiSelectInputSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]//input';

    await this.selectLabels(resources, multiSelectElementSelector, multiSelectInputSelector);
  }

  async selectTriggeredEvents(events: string[]): Promise<void> {
    console.log('selectTriggeredEvents');
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_events"]';

    for (const eventName of events) {
      console.log('selectTriggeredEvents for - eventName: ');
      console.log(eventName);
      await this.selectMultiSelectValue(eventName, multiSelectElementSelector); // eslint-disable-line no-await-in-loop
    }
  }

  async selectMultiSelectValue(value: string, multiSelectElement: string): Promise<void> {
    console.log('selectMultiSelectValue value: ');
    console.log(value);
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

  async selectCreateLabel(
    value: string,
    multiSelectElement: string,
    multiSelectInputSelector: string
  ): Promise<void> {
    console.log('selectCreateLabel value: ');
    console.log(value);
    await this.page.click(multiSelectElement);
    await this.page.locator(multiSelectInputSelector).fill(value);

    await this.page.keyboard.press('Enter');
  }
}
