import type { Page } from  '@playwright/test';

export class CreateTestSourcePage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async createTestSource(testSourceData) {
        await this.setBasicInput(testSourceData.name, 'name');
        await this.setBasicInput(testSourceData.repository.uri, 'uri');

        await this.clickCreateTestSourceButton();
    }

    async setBasicInput(value, inputName) {
        await this.page.locator(`[id="add-source-form_${inputName}"]`).fill(value); //TODO: data-test
    }

    async clickCreateTestSourceButton() {
        await this.page.click('xpath=//div[@role="dialog"]//button[@type="submit"]');
    }
}
