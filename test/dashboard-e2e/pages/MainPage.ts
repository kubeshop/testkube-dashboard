import type {Page} from '@playwright/test';
import {escape} from 'node:querystring';

import config from '../config';

export class MainPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async visitMainPage(): Promise<void> {
    await this.page.addInitScript(() => {
      window.sessionStorage.setItem('vercel-live-feedback-optout', '1');
    });

    if (config.cloudContext) {
      await this.page.addInitScript(userToken => {
        window.localStorage.setItem('isLoggedIn', '1');
        window.localStorage.setItem('idToken', userToken);
      }, config.bearerToken);
    }

    await this.page.goto(`/?~api_server_endpoint=${escape(config.dashboardApiUrl)}&disable_telemetry=true`);
  }

  public async openCreateTestDialog(): Promise<void> {
    await this.page.click('button[data-test="add-a-new-test-btn"]');
  }

  public async openTestExecutionDetails(testName: string): Promise<void> {
    await this.page.locator(`input[data-cy="search-filter"]`).fill(testName);
    await this.page.click(`xpath=//div[@data-test="tests-list-item" and .//span[text()="${testName}"]]`);
  }
}
