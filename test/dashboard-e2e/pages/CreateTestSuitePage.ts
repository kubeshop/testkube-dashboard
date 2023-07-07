import type { Page } from  '@playwright/test';

export class CreateTestSuitePage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async createTestSuite(testSuiteData) {
        await this.setBasicInput(testSuiteData.name, 'name');
        await this.setBasicInput(testSuiteData.description, 'description');
        await this.selectLabels(testSuiteData);
        await this.clickCreateTestSuiteButton();
    }

    async setBasicInput(value, inputName) {
        await this.page.locator(`[id="test-suite-creation_${inputName}"]`).fill(value);
    }

    async selectLabel(labelName) { //TODO: common label selection (after data-test will be added)
        await this.page.click('xpath=//div[contains(@class,"control")][.//div[contains(@id,"placeholder")]]') //TODO: data-test
        await this.page.locator('xpath=//div[contains(@class,"control")][.//div[contains(@id,"placeholder")]]//input').fill(labelName)
        await this.page.keyboard.press('Enter');
    }

    async selectLabels(testSuiteData) {
        for (const [name, value] of Object.entries(testSuiteData.labels)) {
            await this.selectLabel(`${name}:${value}`);
          }
    }

    async clickCreateTestSuiteButton() {
        await this.page.click('button[data-test="add-a-new-test-suite-create-button"]');
    }
}