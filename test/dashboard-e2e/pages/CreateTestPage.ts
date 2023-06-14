import type { Page } from  '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';

export class CreateTestPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }
    
    async createTest(testName) {
        await this._fillInTestDetails(testName);
        await this._clickCreateTestButton();
    }

    async selectTestType(testType) {
        await this.setSelectionSearch(testType, "testType");
    }

    async selectLabel(labelName) {
        await this.page.click('xpath=//div[@id="test-creation_labels"]')
        await this.page.locator('xpath=//div[@id="test-creation_labels"]//input').fill(labelName)
        await this.page.keyboard.press('Enter');
    }

    async selectTestSource(contentData) {
        if(contentData.type === "git") {

            let repositoryData = contentData.repository;

            await this.setSelectionSearch("Git", "testSource");
            for (let key in repositoryData) { // eslint-disable-line no-restricted-syntax, guard-for-in
                let value = repositoryData[key];
                // cy.log(`${key}: ${value}`)
    
                if(key === 'type') {
                    continue; // eslint-disable-line no-continue
                }
    
                await this.setBasicInput(value, key); // eslint-disable-line no-await-in-loop
            }

        }else {
            throw Error('Type not supported by selectTestSource - extend CreateTestPage');
        }
    }

    async setBasicInput(value, inputName) {
        await this.page.locator(`input[id="test-creation_${inputName}"]`).fill(value);
    }

    async setSelectionSearch(value, inputName) {
        let firstWord = value.split(' ')[0]; // workaround - otherwise search won't find it

        await this.page.locator(`input[id="test-creation_${inputName}"]`).fill(firstWord);
        await this.page.click(`div[class*="list-holder"] div[title="${value}"]`);
    }

    async _fillInTestDetails(testName) {
        const testData = TestDataHandler.getTest(testName);
        await this.setBasicInput(testData.name, 'name');
        await this.selectTestType(testData.type);
        await this.selectTestSource(testData.content);
        
        const label = Object.entries(testData.labels)[0].join(':')
        await this.selectLabel(label)
    }

    async _clickCreateTestButton() {
        await this.page.click('button[data-test="add-a-new-test-create-button"]');
    }
}