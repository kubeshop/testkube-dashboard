import { test } from '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
import { CommonHelpers } from '../helpers/common-helpers';
import { MainPage } from '../pages/MainPage';
import { NavigationSiderPage } from '../pages/NavigationSiderPage';
import { TestSuitesPage } from '../pages/TestSuitesPage';
import { CreateTestSuitePage } from '../pages/CreateTestSuitePage';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler=new TestDataHandler(process.env.RUN_ID);

test(`Creating Test Suite`, async ({ page }) => {
    const testSuiteName = 'testsuite-empty'
    const testSuiteData = testDataHandler.getTestSuite(testSuiteName);
    const realTestSuiteName = testSuiteData.name;

    await apiHelpers.assureTestSuiteNotCreated(realTestSuiteName);

    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();

    const navigationSiderPage=new NavigationSiderPage(page);
    await navigationSiderPage.openMenuItem('test-suites');

    const testSuitesPage=new TestSuitesPage(page);
    await testSuitesPage.openCreateTestSuiteDialog();

    const createTestSuitePage=new CreateTestSuitePage(page);
    await createTestSuitePage.createTestSuite(testSuiteData);
    await page.waitForURL(`**/test-suites/executions/${realTestSuiteName}`);
  
    const createdTestSuiteData = await apiHelpers.getTestSuiteData(realTestSuiteName);
    await CommonHelpers.validateTestSuite(testSuiteData, createdTestSuiteData);

    // // cleanup
    await apiHelpers.removeTestSuite(realTestSuiteName)
  });

  test.skip(`Test suite - add tests`, async ({ page }) => {

  });
  
  test.skip(`Test suite - edit tests`, async ({ page }) => {

  });