import type { Page } from  '@playwright/test';

export class MainPage{
    readonly page: Page;
    constructor(page:Page){
        this.page=page;
    }

    async visitMainPage(){
      if (process.env.CLOUD_CONTEXT) {
        const userToken = process.env.BEARER_TOKEN
        const apiEndpoint = process.env.CLOUD_API_URL

        await this.page.addInitScript(()=>{
            window.localStorage.setItem('isLoggedIn', '1');
            window.localStorage.setItem('isGADisabled', '1');
        });

        await this.page.addInitScript(userToken => {
            window.localStorage.setItem('idToken', userToken);
        }, userToken);

        await this.page.addInitScript(apiEndpoint => {
            window.localStorage.setItem('apiEndpoint', apiEndpoint);
        }, apiEndpoint);

        await this.page.goto('/')
      } else {
        await this.page.goto(`/apiEndpoint?apiEndpoint=${process.env.DASHBOARD_API_URL}`);
    
        await this.page.addInitScript(() => {
          window.localStorage.setItem('isGADisabled', '1');
        });
      }

    }

    async openCreateTestDialog() {
      await this.page.click('button[data-test="add-a-new-test-btn"]');
    }

    async openTestExecutionDetails(realTestName) {
      await this.page.locator(`input[data-cy="search-filter"]`).fill(realTestName);
      await this.page.click(`xpath=//div[@data-test="tests-list-item" and .//span[text()="${realTestName}"]]`);
    }
}