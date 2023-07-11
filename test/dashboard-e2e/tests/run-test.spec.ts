import {test} from '@playwright/test';

import {ApiHelpers} from '../helpers/api-helpers';
import {TestDataHandler} from '../helpers/test-data-handler';
import {MainPage} from '../pages/MainPage';
import {TestExecutionsPage} from '../pages/TestExecutionsPage';

const api = new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler = new TestDataHandler(process.env.RUN_ID);

const testNames = ['cypress-git-created', 'k6-git-created', 'postman-git-created'];
// eslint-disable-next-line no-restricted-syntax
for (const testName of testNames) {
  test(`Run test ${testName}`, async ({page}) => {
    const testData = testDataHandler.getTest(testName);
    const realTestName = testData.name;

    await api.assureTestCreated(testData, false);
    const lastExecutionNumber = await api.getLastExecutionNumber(realTestName);

    const mainPage = new MainPage(page);
    await mainPage.visitMainPage();
    await mainPage.openTestExecutionDetails(realTestName);

    const testExecutionsPage = new TestExecutionsPage(page);
    await testExecutionsPage.runTest();

    const currentExecutionNumber = lastExecutionNumber + 1;
    const executionName = `${realTestName}-${currentExecutionNumber}`;

    await testExecutionsPage.openExecutionDetails(executionName); // openLatestExecutionDetails?

    // cleanup
    await api.abortTest(realTestName, executionName); // abort test not to waste compute resources
    await api.removeTest(realTestName);
  });
}
