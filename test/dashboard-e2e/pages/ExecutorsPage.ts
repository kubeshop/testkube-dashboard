import type { Page } from  '@playwright/test';

export class ExecutorsPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async openCreateExecutorDialog() {
      await this.page.click('xpath=//button//span[contains(text(),"Create a new executor")]'); //TODO: data-test
    }
}
