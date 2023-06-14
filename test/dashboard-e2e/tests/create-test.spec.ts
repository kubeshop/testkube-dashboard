import { test } from '@playwright/test';

import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
import { CommonHelpers } from '../helpers/common-helpers';
import { MainPage } from '../pages/MainPage';
import { CreateTestPage } from '../pages/CreateTestPage';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('isGADisabled', '1');
  });
});

const testNames = ['cypress-git', 'k6-git', 'postman-git'];
for (const testName of testNames) { // eslint-disable-line no-restricted-syntax
  test(`Creating test for ${testName}`, async ({ page }) => {
    const testData = TestDataHandler.getTest(testName);

    await apiHelpers.assureTestNotCreated(testData.name);
    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();
    await mainPage.openCreateTestDialog();
  
    const createTestPage=new CreateTestPage(page);
    await createTestPage.createTest(testName);
  
    await page.waitForURL(`**/tests/executions/${testData.name}`);
  
    const createdTestData = await apiHelpers.getTestData(testData.name);
  
    await CommonHelpers.validateTest(testData, createdTestData);
  });
}

test.skip(`Create test from File`, async ({ page }) => {

});

test.skip(`Create test from String`, async ({ page }) => {

});

test.skip(`Create test from Git source`, async ({ page }) => {

});

test.skip(`Create test with Labels`, async ({ page }) => {

});