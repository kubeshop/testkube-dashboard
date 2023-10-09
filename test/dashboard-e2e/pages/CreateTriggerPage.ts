import type {Page} from '@playwright/test';

import type {TriggerData} from '../types';

export class CreateTriggerPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTrigger(triggerData: Partial<TriggerData>): Promise<void> {
    await this.setName(triggerData.name)
    await this.setResource(triggerData.resource)
    await this.setResourceSelector(triggerData.resourceSelector)
    await this.setTriggerEvent(triggerData.event)
    await this.clickNextButton()
    await this.setTriggerAction(triggerData.action, triggerData.execution)
    await this.setTestSelector(triggerData.testSelector)
  }

  async setName(triggerName: string) {
    await this.page.locator(`xpath=//input[@data-test="triggers-add-modal-name"]`).fill(triggerName);
  }

  async setResource(resourceType: string) {
    await this.page.click(`xpath=//input[@id="add-trigger-form_resource"]`)
    await this.page.click(`xpath=//div[@id="add-trigger-form_resource_list"]//div[contains(@id,"add-trigger-form_resource_list") and text()=${resourceType}]`)
  }

  async setResourceSelector(resourceSelector: { name: string; }) {
    if(resourceSelector.name) {
      await this.page.click(`xpath=//div[@data-test="triggers-add-modal-condition-selector-switch"]//div[@title="BY NAME"]`)
      await this.page.locator(`xpath=//input[@id="add-trigger-form_resourceNameSelector"]`).fill(resourceSelector.name);
    } //TODO: resourceSelector: labelSelector
  }

  async setTriggerEvent(triggerEvent: string) {
    await this.page.click(`xpath=//input[@id="add-trigger-form_event"]`)
    await this.page.click(`xpath=//div[@id="add-trigger-form_event_list"]//div[text()="${triggerEvent}"]`)
  }

  async clickNextButton() {
    await this.page.click(`xpath=//button[@data-test="triggers-add-modal-next:first"]`)
  }

  async setTriggerAction(action: string, execution: string) {
    await this.page.click(`xpath=//input[@id="add-trigger-form_action]`)
    await this.page.click(`xpath=//div[@id="add-trigger-form_action_list"]//div[text()="${action} ${execution}"]`)
  }

  async setTestSelector(testSelector: { name: string; }) {
    if(testSelector.name) {
      await this.page.click(`xpath=//div[@data-test="triggers-add-modal-action-switch"]//div[@title="BY NAME"]`)
      await this.page.click(`xpath=//div[@id="add-trigger-form_testNameSelector_list"]//div[text()="${testSelector.name}"]`)
    }
  }

  async clickCreateButton() {
    await this.page.click(`xpath=//button[@data-test="webhooks-add-modal-next:second"]`)
  }
}
