/* eslint-disable no-restricted-syntax */
import {test} from '@playwright/test';

import {ApiHelpers} from '../api/api-helpers';
import {TestDataHandler} from '../data-handlers/test-data-handlers';
import {MainPage} from '../pages/MainPage';
import {TestExecutionsPage} from '../pages/TestExecutionsPage';

const apiHelpers = new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler = new TestDataHandler(process.env.RUN_ID);

test(`Run test logs`, async ({page}) => {
  const testData = testDataHandler.getTest('k6-git-created');
  const realTestName = testData.name;

  await apiHelpers.assureTestCreated(testData, false);
  const lastExecutionNumber = await apiHelpers.getLastExecutionNumber(realTestName);

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

  await apiHelpers.abortTest(realTestName, executionName); // abort test not to waste compute resources
});
