import { test } from '@playwright/test';
import { TestDataHandler } from '../data-handlers/test-data-handlers';
import { ApiHelpers } from '../api/api-helpers';
import { CommonHelpers } from '../helpers/common-helpers';
import { MainPage } from '../pages/MainPage';
import { NavigationSiderPage } from '../pages/NavigationSiderPage';
import { CreateExecutorPage } from '../pages/CreateExecutorPage';
import { ExecutorsPage } from '../pages/ExecutorsPage';
const apiHelpers=new ApiHelpers(process.env.API_URL, process.env.CLOUD_CONTEXT, process.env.BEARER_TOKEN);
const testDataHandler=new TestDataHandler(process.env.RUN_ID);

test(`Create custom container executor`, async ({ page }) => {
    const executorName = 'container-executor-curl-1'
    const executorData = testDataHandler.getExecutor(executorName);
    const realExecutorName = executorData.name;

    await apiHelpers.assureExecutorNotCreated(realExecutorName);
    const mainPage=new MainPage(page);
    await mainPage.visitMainPage();

    const navigationSiderPage=new NavigationSiderPage(page);
    await navigationSiderPage.openMenuItem('executors');

    const executorsPage=new ExecutorsPage(page);
    await executorsPage.openCreateExecutorDialog();

    const createExecutorPage=new CreateExecutorPage(page);
    await createExecutorPage.createExecutor(executorData);

    //validation
    await page.waitForURL(`**/executors/${realExecutorName}`);
    const createdExecutorData = await apiHelpers.getExecutorData(realExecutorName);
    await CommonHelpers.validateExecutor(executorData, createdExecutorData);

    // // cleanup
    await apiHelpers.removeExecutor(realExecutorName)
});

test.skip(`Custom container executor - general settings`, async ({ page }) => {

});

test.skip(`Custom container executor - delete executor`, async ({ page }) => {

});

test.skip(`Custom container executor - container image`, async ({ page }) => {

});

test.skip(`Custom container executor - command and arguments`, async ({ page }) => {

});

test.skip(`Custom container executor - definition`, async ({ page }) => {

});