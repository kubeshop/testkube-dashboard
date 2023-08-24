import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {TestDataHandler} from '../helpers/test-data-handler';
import {MainPage} from '../pages/MainPage';
import {TestExecutionsPage} from '../pages/TestExecutionsPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

test(`Run test logs`, async ({page}) => {
  const testData = testDataHandler.getTest('k6-git-created');
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

  await page.waitForTimeout(5000);
  await testExecutionsPage.validateExecutionLogContents('Environment variables read successfully');

  await api.abortTest(realTestName, executionName); // abort test not to waste compute resources
});
