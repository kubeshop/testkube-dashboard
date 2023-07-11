import type { Page } from  '@playwright/test';

export class TestSourceGeneralSettingsPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async deleteTestSource(testSourceName) {
      await this.page.click('//button/span[text()="Delete"]'); //TODO: data-test
      await this.page.locator(`xpath=//div[@role="dialog"]//input`).fill(testSourceName); //TODO: data-test
      await this.page.click('xpath=//div[@role="dialog"]//span[text()="Delete"]'); //TODO: data-test
    }
}
