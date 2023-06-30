import { test } from '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
import { CommonHelpers } from '../helpers/common-helpers';
import { MainPage } from '../pages/MainPage';
import { CreateTestPage } from '../pages/CreateTestPage';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler=new TestDataHandler(process.env.RUN_ID);


const testNames = ['cypress-git', 'k6-git', 'postman-git'];
for (const testName of testNames) { // eslint-disable-line no-restricted-syntax
  test(`Creating test for ${testName}`, async ({ page }) => {
    const testData = testDataHandler.getTest(testName);
    const realTestName = testData.name;

    await apiHelpers.assureTestNotCreated(realTestName);
    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();
    await mainPage.openCreateTestDialog();

    const createTestPage=new CreateTestPage(page);
    await createTestPage.createTest(testData);
    await page.waitForURL(`**/tests/executions/${realTestName}`);
  
    const createdTestData = await apiHelpers.getTestData(realTestName);
    await CommonHelpers.validateTest(testData, createdTestData);

    // cleanup
    await apiHelpers.removeTest(realTestName)
  });
}

test.skip(`Create test from File`, async ({ page }) => {

});

test.skip(`Create test from String`, async ({ page }) => {

});

test.skip(`Create test from Git source`, async ({ page }) => {

});

test.skip(`Create test for Custom Container Executor`, async ({ page }) => {

});