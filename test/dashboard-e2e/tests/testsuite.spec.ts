import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateTestSuite} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateTestSuitePage} from '../pages/CreateTestSuitePage';
import {MainPage} from '../pages/MainPage';
import {NavigationSiderPage} from '../pages/NavigationSiderPage';
import {TestSuitesPage} from '../pages/TestSuitesPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

test(`Creating Test Suite`, async ({page}) => {
  const testSuiteName = 'testsuite-empty';
  const testSuiteData = testDataHandler.getTestSuite(testSuiteName);
  const realTestSuiteName = testSuiteData.name;

  await api.assureTestSuiteNotCreated(realTestSuiteName);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('test-suites');

  const testSuitesPage = new TestSuitesPage(page);
  await testSuitesPage.openCreateTestSuiteDialog();

  const createTestSuitePage = new CreateTestSuitePage(page);
  await createTestSuitePage.createTestSuite(testSuiteData);
  await page.waitForURL(`**/test-suites/${realTestSuiteName}`);

  const createdTestSuiteData = await api.getTestSuiteData(realTestSuiteName);
  await validateTestSuite(testSuiteData, createdTestSuiteData);

  // Cleanup
  await api.removeTestSuite(realTestSuiteName);
});

test.skip(`Test suite - add tests`, async ({page}) => {});

test.skip(`Test suite - edit tests`, async ({page}) => {});
