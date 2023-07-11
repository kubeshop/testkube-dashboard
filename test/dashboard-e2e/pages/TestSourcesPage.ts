import type { Page } from  '@playwright/test';

export class TestSourcesPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async openCreateTestSourceDialog() {
      await this.page.click('xpath=//button//span[contains(text(),"Create a new source")]'); //TODO: data-test
    }

    async openTestSourceDetails(testSourceName) {
      await this.page.click(`xpath=//div/span[text()="${testSourceName}"]`);
    }
}
