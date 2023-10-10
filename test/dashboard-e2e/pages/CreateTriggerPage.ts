import type {Page} from '@playwright/test';

import type {TriggerData} from '../types';

export class CreateTriggerPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTrigger(triggerData: Partial<TriggerData>): Promise<void> {
    await this.setName(triggerData.name);
    await this.setResource(triggerData.resource);
    await this.setResourceSelector(triggerData.resourceSelector);
    await this.setTriggerEvent(triggerData.event);
    await this.clickNextButton();
    await this.setTriggerAction(triggerData.action, triggerData.execution);
    await this.setTestSelector(triggerData.testSelector);
    await this.clickCreateButton();
  }

  async setName(triggerName: string) {
    await this.page.locator(`xpath=//input[@data-test="triggers-add-modal-name"]`).fill(triggerName);
  }

  async setResource(resourceType: string) {
    await this.page.click(
      `xpath=//div[@data-test="triggers-add-modal-condition-resource"]//div[contains(@class,"control-input-content")]`
    );
    await this.page.click(`xpath=//div[contains(@class,"ant-select-item-option") and @title="${resourceType}"]`); //TODO: data-test (for rc-virtual-list)
  }

  async setResourceSelector(resourceSelector: {name: string; namespace: string}) {
    if (resourceSelector.name) {
      const resourceSelectorString = `${resourceSelector.namespace}/${resourceSelector.name}`;
      await this.page.click(
        `xpath=//div[@data-test="triggers-add-modal-condition-selector-switch"]//div[@title="BY NAME"]`
      );
      await this.page
        .locator(`xpath=//input[@id="add-trigger-form_resourceNameSelector"]`)
        .fill(resourceSelectorString);
    }
  }

  async setTriggerEvent(triggerEvent: string) {
    await this.page.click(`xpath=//input[@id="add-trigger-form_event"]`);
    await this.page.click(
      `xpath=//div[@class="rc-virtual-list"]//div[contains(@class,"item-option") and @title="${triggerEvent}"]`
    ); //TODO: data-test (for rc-virtual-list)
  }

  async clickNextButton() {
    await this.page.click(`xpath=//button[@data-test="triggers-add-modal-next:first"]`);
  }

  async setTriggerAction(action: string, execution: string) {
    await this.page.click(`xpath=//input[@id="add-trigger-form_action"]`);
    await this.page.click(
      `xpath=//div[@class="rc-virtual-list"]//div[contains(@class,"item-option") and @title="${action} ${execution}"]`
    );
  }

  async setTestSelector(testSelector: {name: string}) {
    if (testSelector.name) {
      await this.page.click(`xpath=//div[@data-test="triggers-add-modal-action-switch"]//div[@title="BY NAME"]`);
      await this.page.click(`xpath=//input[@id="add-trigger-form_testNameSelector"]`);
      await this.page.click(
        `xpath=//div[@class="rc-virtual-list"]//div[contains(@class,"option-content")]//span[text()="${testSelector.name}"]`
      );
    }
  }

  async clickCreateButton() {
    await this.page.click(`xpath=//button[@data-test="webhooks-add-modal-next:second"]`);
  }
}
