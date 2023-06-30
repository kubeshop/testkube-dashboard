import type { Page } from  '@playwright/test';

export class CreateExecutorPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async createExecutor(executorData) {
        await this.setBasicInput(executorData.name, 'name');
        await this.setBasicInput(executorData.types[0], 'type');
        await this.setBasicInput(executorData.image, 'image');
        await this.clickCreateExecutorButton();
    }

    async setBasicInput(value, inputName) {
        await this.page.locator(`xpath=//div[@role="dialog"]//input[@id="${inputName}"]`).fill(value); //TODO: data-test
    }

    async clickCreateExecutorButton() {
        await this.page.click('xpath=//div[@role="dialog"]//button[@type="submit"]');
    }
}
