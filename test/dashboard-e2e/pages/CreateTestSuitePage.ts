import type {Page} from '@playwright/test';

import type {TestSuiteData} from '../types';

export class CreateTestSuitePage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTestSuite(testSuiteData: Partial<TestSuiteData>): Promise<void> {
    await this.setBasicInput(testSuiteData.name, 'name');
    await this.setBasicInput(testSuiteData.description, 'description');
    await this.selectLabels(testSuiteData.labels);
    await this.clickCreateTestSuiteButton();
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> {
    await this.page.locator(`[id="test-suite-creation_${inputName}"]`).fill(`${value}`);
  }

  public async selectLabel(labelName: string): Promise<void> {
    // TODO: common label selection (after data-test will be added)
    await this.page.click('xpath=//div[contains(@class,"control")][.//div[contains(@id,"placeholder")]]'); // TODO: data-test
    await this.page
      .locator('xpath=//div[contains(@class,"control")][.//div[contains(@id,"placeholder")]]//input')
      .fill(labelName);
    await this.page.keyboard.press('Enter');
  }

  public async selectLabels(labels: Record<string, string>): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of Object.entries(labels)) {
      await this.selectLabel(`${name}:${value}`); // eslint-disable-line no-await-in-loop
    }
  }

  async clickCreateTestSuiteButton() {
    await this.page.click('button[data-test="add-a-new-test-suite-create-button"]');
  }
}
