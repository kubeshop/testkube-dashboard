import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateExecutor} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateExecutorPage} from '../pages/CreateExecutorPage';
import {ExecutorsPage} from '../pages/ExecutorsPage';
import {MainPage} from '../pages/MainPage';
import {NavigationSiderPage} from '../pages/NavigationSiderPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

test(`Create custom container executor`, async ({page}) => {
  const executorName = 'container-executor-curl-1';
  const executorData = testDataHandler.getExecutor(executorName);
  const realExecutorName = executorData.name;

  await api.assureExecutorNotCreated(realExecutorName);
  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('executors');

  const executorsPage = new ExecutorsPage(page);
  await executorsPage.openCreateExecutorDialog();

  const createExecutorPage = new CreateExecutorPage(page);
  await createExecutorPage.createExecutor(executorData);

  // Validation
  await page.waitForURL(`**/executors/${realExecutorName}`);
  const createdExecutorData = await api.getExecutorData(realExecutorName);
  await validateExecutor(executorData, createdExecutorData);

  // Cleanup
  await api.removeExecutor(realExecutorName);
});

test.skip(`Custom container executor - general settings`, async ({page}) => {});

test.skip(`Custom container executor - delete executor`, async ({page}) => {});

test.skip(`Custom container executor - container image`, async ({page}) => {});

test.skip(`Custom container executor - command and arguments`, async ({page}) => {});

test.skip(`Custom container executor - definition`, async ({page}) => {});
