import type {Page} from '@playwright/test';

import type {TestSourceData} from '../types';

export class CreateTestSourcePage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTestSource(testSourceData: TestSourceData): Promise<void> {
    await this.setBasicInput(testSourceData.name, 'name');
    await this.setBasicInput(testSourceData.repository.uri, 'uri');

    await this.clickCreateTestSourceButton();
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> {
    await this.page.locator(`[id="add-source-form_${inputName}"]`).fill(`${value}`); // TODO: data-test
  }

  public async clickCreateTestSourceButton(): Promise<void> {
    await this.page.click('xpath=//div[@role="dialog"]//button[@type="submit"]');
  }
}
