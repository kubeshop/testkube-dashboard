import {Page, expect} from '@playwright/test';

export class TestExecutionsPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async runTest(): Promise<void> {
    await this.page.click('//span[@class="ant-page-header-heading-extra"]//button[.//span]'); // TODO: data-test needed
  }

  public async openExecutionDetails(executionName: string): Promise<void> {
    await this.page.click(`xpath=//tr[.//span[text()="${executionName}"]]`);
  }

  public async checkWebSocketOpened(): Promise<void> {
    const websocket = await this.page.waitForEvent('websocket');
    const isClosed = await websocket.isClosed();
    await expect(isClosed).toBeFalsy();
  }

  public async validateExecutionLogContents(content: string | RegExp): Promise<void> {
    const logs = await this.page.locator('xpath=//pre[@data-test="log-output"]');
    await expect(logs).toContainText(content);
  }
}
