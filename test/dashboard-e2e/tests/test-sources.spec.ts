import { test } from '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
import { CommonHelpers } from '../helpers/common-helpers';
import { MainPage } from '../pages/MainPage';
import { NavigationSiderPage } from '../pages/NavigationSiderPage';
import { TestSourcesPage } from '../pages/TestSourcesPage';
import { CreateTestSourcePage } from '../pages/CreateTestSourcePage';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler=new TestDataHandler(process.env.RUN_ID);

test(`Create test source`, async ({ page }) => {
    const testSourceName = 'testsource-k6-testkube-1'
    const testSourceData = testDataHandler.getTestSource(testSourceName);
    const realTestSourceName = testSourceData.name;

    await apiHelpers.assureTestSourceNotCreated(realTestSourceName);

    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();

    const navigationSiderPage=new NavigationSiderPage(page);
    await navigationSiderPage.openMenuItem('sources');

    const testSourcesPage=new TestSourcesPage(page);
    await testSourcesPage.openCreateTestSourceDialog();

    const createTestSourcePage=new CreateTestSourcePage(page);
    await createTestSourcePage.createTestSource(testSourceData);
    await page.waitForURL(`**/sources/${realTestSourceName}`);
  
    const createdTestSourceData = await apiHelpers.getTestSourceData(realTestSourceName);
    await CommonHelpers.validateTestSource(testSourceData, createdTestSourceData);

    // // cleanup
    await apiHelpers.removeTestSource(realTestSourceName)
});

test.skip(`Edit test source`, async ({ page }) => {

});

test.skip(`Delete test source`, async ({ page }) => {

});

test.skip(`Test source - definition`, async ({ page }) => {

});