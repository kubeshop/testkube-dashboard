import type { Page } from  '@playwright/test';

export class NavigationSiderPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }
    
    async openMenuItem(itemName) {
        await this.page.click(`//*[@data-cy="navigation-sider"]//*[@data-cy="navigation-tab" and contains(@href,"${itemName}")]`); // TODO: data-test needed
        await this.page.waitForURL(`**/${itemName}`);
    }
}