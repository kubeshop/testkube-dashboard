import { test } from '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
import { MainPage } from '../pages/MainPage';
import { TestExecutionsPage } from '../pages/TestExecutionsPage';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler=new TestDataHandler(process.env.RUN_ID);

const testNames = ['cypress-git-created', 'k6-git-created', 'postman-git-created'];
for (const testName of testNames) { // eslint-disable-line no-restricted-syntax
  test(`Run test ${testName}`, async ({ page }) => {
    const testData = testDataHandler.getTest(testName);
    const realTestName = testData.name;
    
    await apiHelpers.assureTestCreated(testData, false);
    const lastExecutionNumber = await apiHelpers.getLastExecutionNumber(realTestName);
    
    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();
    await mainPage.openTestExecutionDetails(realTestName);

    const testExecutionsPage=new TestExecutionsPage(page);
    await testExecutionsPage.runTest();

    const currentExecutionNumber = lastExecutionNumber+1;
    const executionName = `${realTestName}-${currentExecutionNumber}`;

    await testExecutionsPage.openExecutionDetails(executionName); // openLatestExecutionDetails?

    await apiHelpers.abortTest(realTestName, executionName); // abort test not to waste compute resources
});
}