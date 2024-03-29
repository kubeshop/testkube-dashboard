import type {Page} from '@playwright/test';
import {setTimeout as timeout} from 'node:timers/promises';

import type {TestData} from '../types';

const path = require('path');

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
    const {type} = contentData;

    if (type === 'git') {
      const repositoryData = contentData.repository as Record<string, string | number>;
      await this.setSelectionSearch('Git', 'testSource');
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(repositoryData)) {
        if (key !== 'type') {
          // eslint-disable-next-line no-await-in-loop
          await this.setBasicInput(value, key);
        }
      }
    } else if (type === 'string') {
      await this.setSelectionSearch('String', 'testSource');
      await this.setBasicInput(contentData.data, 'string');
    } else if (type === 'file') {
      await this.setSelectionSearch('File', 'testSource');
      await this.page.setInputFiles(
        'xpath=//span[@class="ant-upload"]//input[@type="file"]',
        CreateTestPage.getAbsoluteFixtureFilePath(contentData.fixture_file_path)
      );
    }
  }

  public async setBasicInput(value: string | number, inputName: string): Promise<void> {
    await this.page.locator(`[id="test-creation_${inputName}"]`).fill(`${value}`);
  }

  public async scrollSelectionTo(value: string | number, inputName: string): Promise<void> {
    const scrollSelector = `#test-creation_${inputName}_list ~ .rc-virtual-list .rc-virtual-list-holder`;
    await timeout(100);
    await this.page.evaluate(`
      const container = document.querySelector(${JSON.stringify(scrollSelector)});
      const scroll = (to) => {
        if (!container || to > container.scrollHeight || container.querySelector('.rc-virtual-list-holder-inner div[title="${value}"]')) {
          return;
        }
        container.scrollTop = to;
        to += container.clientHeight;
        setTimeout(() => scroll(to), 50);
      };
      scroll(0);
    `);
  }

  public async setSelectionSearch(value: string | number, inputName: string): Promise<void> {
    const firstWord = `${value}`.split(' ')[0]; // workaround - otherwise search won't find it
    await this.page.locator(`input[id="test-creation_${inputName}"]`).fill(firstWord);
    await this.scrollSelectionTo(value, inputName);
    await this.page.click(`#test-creation_${inputName}_list ~ .rc-virtual-list div[title="${value}"]`);
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

  private static getAbsoluteFixtureFilePath(fixtureFileName: string) {
    return path.resolve(__dirname, `../fixtures/files/${fixtureFileName}`);
  }
}
