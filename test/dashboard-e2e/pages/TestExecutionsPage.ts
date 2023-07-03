import {Page, expect} from '@playwright/test';

export class TestExecutionsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async runTest() {
    await this.page.click('//span[@class="ant-page-header-heading-extra"]//button[.//span]'); // TODO: data-test needed
  }

  async openExecutionDetails(executionName) {
    await this.page.click(`xpath=//tr[.//span[text()="${executionName}"]]`);
  }

  async checkWebSocketOpened() {
    const websocket = await this.page.waitForEvent('websocket');
    const isClosed = await websocket.isClosed();
    await expect(isClosed).toBeFalsy();
  }

  async validateExecutionLogContents(content: string | RegExp) {
    const logs = await this.page.locator('xpath=//pre[@data-test="log-output"]');
    await expect(logs).toContainText(content);
  }
}
