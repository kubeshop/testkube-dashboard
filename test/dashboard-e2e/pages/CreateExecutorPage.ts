import type {Page} from '@playwright/test';

import type {ExecutorData} from '../types';

export class CreateExecutorPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async createExecutor(executorData: Partial<ExecutorData>): Promise<void> {
    await this.setBasicInput(executorData.name, 'name');
    await this.setBasicInput(executorData.types[0], 'type');
    await this.setBasicInput(executorData.image, 'image');
    await this.clickCreateExecutorButton();
  }

  public async setBasicInput(value: string | number, inputId: string): Promise<void> {
    await this.page.locator(`xpath=//div[@role="dialog"]//input[@id="${inputId}"]`).fill(`${value}`); // TODO: data-test
  }

  public async clickCreateExecutorButton(): Promise<void> {
    await this.page.click('xpath=//div[@role="dialog"]//button[@type="submit"]');
  }
}
