import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateTest} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateTestPage} from '../pages/CreateTestPage';
import {MainPage} from '../pages/MainPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

const testNames = ['cypress-git', 'k6-git', 'postman-git', 'k6-string', 'k6-file'];
// eslint-disable-next-line no-restricted-syntax
for (const testName of testNames) {
  test(`Creating test ${testName}`, async ({page}) => {
    const testData = testDataHandler.getTest(testName);
    const realTestName = testData.name;

    await api.assureTestNotCreated(realTestName);
    const mainPage = new MainPage(page);
    await mainPage.visitMainPage();
    await mainPage.openCreateTestDialog();

    const createTestPage = new CreateTestPage(page);
    await createTestPage.createTest(testData);
    await page.waitForURL(`**/tests/${realTestName}`);

    const createdTestData = await api.getTestData(realTestName);
    await validateTest(testData, createdTestData);

    // cleanup
    await api.removeTest(realTestName);
  });
}

test.skip(`Create test from Git source`, async ({page}) => {});

test.skip(`Create test for Custom Container Executor`, async ({page}) => {});
