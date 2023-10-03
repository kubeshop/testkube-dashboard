import type {Page} from '@playwright/test';

import type {WebhookData} from '../types';

export class CreateWebhookPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createWebhook(webhookData: WebhookData): Promise<void> {
    await this.setBasicInput(webhookData.name, 'name');
    await this.selectResourceIdentifier(webhookData.selector)
    await this.selectTriggeredEvents(webhookData.events)

    await this.clickNextButton();
    await this.setBasicInput(webhookData.uri, 'uri');
    await this.clickCreateWebhookButton();
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> { //TODO: move to common helpers
    await this.page.locator(`[id="webhook-creation-modal_${inputName}"]`).fill(`${value}`);
  }

  public async clickNextButton() {
    await this.page.click('//button//span[text()="Next"]'); //TODO: data-test
  }

  public async clickCreateWebhookButton() {
    await this.page.click('//button//span[text()="Submit"]'); //TODO: data-test
  }

  public async selectResourceIdentifier(resources: Record<string, string>): Promise<void> {
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]'
    const multiSelectInputSelector = 'xpath=//div[@id="webhook-creation-modal_selector"]//input'

    await this.selectLabels(resources, multiSelectElementSelector, multiSelectInputSelector);
  }

  public async selectTriggeredEvents(events): Promise<void> {
    console.log('selectTriggeredEvents')
    const multiSelectElementSelector = 'xpath=//div[@id="webhook-creation-modal_events"]'
    const multiSelectInputSelector = 'xpath=//div[@id="webhook-creation-modal_events"]//input'

    for (const eventName of events) {
      console.log('selectTriggeredEvents for - eventName: ')
      console.log(eventName)
      await this.selectMultiSelectValue(eventName, multiSelectElementSelector, multiSelectInputSelector); // eslint-disable-line no-await-in-loop
    }
  }

  // TODO: common label selection
  public async selectMultiSelectValue(value: string, multiSelectElement: string, multiSelectInput:string): Promise<void> {
    console.log('selectMultiSelectValue value: ')
    console.log(value)
    await this.page.click(multiSelectElement); // TODO: data-test
    await this.page
      .locator(multiSelectInput)
      .fill(value);
    await this.page.keyboard.press('Enter');
  }

    // TODO: common label selection
  public async selectLabels(labels: Record<string, string>, multiSelectElement: string, multiSelectInput: string): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of Object.entries(labels)) {
      await this.selectMultiSelectValue(`${name}:${value}`, multiSelectElement, multiSelectInput); // eslint-disable-line no-await-in-loop
    }
  }
}