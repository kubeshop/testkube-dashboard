import type {Page} from '@playwright/test';

import type {TestData} from '../types';

export class CreateTestPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTest(testData: TestData): Promise<void> {
    await this.fillInTestDetails(testData);
    await this.clickCreateTestButton();
  }

  public async selectTestType(testType: string): Promise<void> {
    await this.setSelectionSearch(testType, 'testType');
  }

  public async selectLabel(labelName: string): Promise<void> {
    await this.page.click('xpath=//div[@id="test-creation_labels"]');
    await this.page.locator('xpath=//div[@id="test-creation_labels"]//input').fill(labelName);
    await this.page.keyboard.press('Enter');
  }

  public async selectTestSource(contentData: any): Promise<any> {
    if (contentData.type === 'git') {
      const repositoryData = contentData.repository as Record<string, string | number>;
      await this.setSelectionSearch('Git', 'testSource');
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(repositoryData)) {
        if (key !== 'type') {
          // eslint-disable-next-line no-await-in-loop
          await this.setBasicInput(value, key);
        }
      }
    } else {
      throw Error('Type not supported by selectTestSource - extend CreateTestPage');
    }
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> {
    await this.page.locator(`input[id="test-creation_${inputName}"]`).fill(`${value}`);
  }

  public async setSelectionSearch(value: string | number, inputName: string): Promise<void> {
    const firstWord = `${value}`.split(' ')[0]; // workaround - otherwise search won't find it
    await this.page.locator(`input[id="test-creation_${inputName}"]`).fill(firstWord);
    await this.page.click(`div[class*="list-holder"] div[title="${value}"]`);
  }

  private async fillInTestDetails(testData: Partial<TestData>): Promise<void> {
    await this.setBasicInput(testData.name, 'name');
    await this.selectTestType(testData.type);
    await this.selectTestSource(testData.content);

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of Object.entries(testData.labels)) {
      // eslint-disable-next-line no-await-in-loop
      await this.selectLabel(`${name}:${value}`);
    }
  }

  private async clickCreateTestButton(): Promise<void> {
    await this.page.click('button[data-test="add-a-new-test-create-button"]');
  }
}
