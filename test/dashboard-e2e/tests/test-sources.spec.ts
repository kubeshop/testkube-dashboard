import {expect, test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateTestSource} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateTestSourcePage} from '../pages/CreateTestSourcePage';
import {MainPage} from '../pages/MainPage';
import {NavigationSiderPage} from '../pages/NavigationSiderPage';
import {TestSourceGeneralSettingsPage} from '../pages/TestSourceGeneralSettingsPage';
import {TestSourcesPage} from '../pages/TestSourcesPage';

const apiHelpers = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(process.env.RUN_ID);

test(`Create test source`, async ({page}) => {
  const testSourceName = 'testsource-k6-testkube-1';
  const testSourceData = testDataHandler.getTestSource(testSourceName);
  const realTestSourceName = testSourceData.name;

  await apiHelpers.assureTestSourceNotCreated(realTestSourceName);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('sources');

  const testSourcesPage = new TestSourcesPage(page);
  await testSourcesPage.openCreateTestSourceDialog();

  const createTestSourcePage = new CreateTestSourcePage(page);
  await createTestSourcePage.createTestSource(testSourceData);
  await page.waitForURL(`**/sources/${realTestSourceName}`);

  const createdTestSourceData = await apiHelpers.getTestSourceData(realTestSourceName);
  await validateTestSource(testSourceData, createdTestSourceData);

  // // cleanup
  await apiHelpers.removeTestSource(realTestSourceName);
});

test.skip(`Create test source (auth)`, async ({page}) => {});

test(`Edit test source`, async ({page}) => {
  const testSourceName = 'testsource-k6-testkube-created-1';
  const testSourceData = testDataHandler.getTestSource(testSourceName);
  const realTestSourceName = testSourceData.name;

  const targetSourceData = {
    ...testSourceData,
    repository: {
      uri: `https://github.com/kubeshop/testkube-dashboard.git`,
    },
  };

  await apiHelpers.assureTestSourceCreated(testSourceData);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('sources');

  const testSourcesPage = new TestSourcesPage(page);
  await testSourcesPage.openTestSourceDetails(realTestSourceName);

  const testSourceGeneralSettingsPage = new TestSourceGeneralSettingsPage(page);
  await testSourceGeneralSettingsPage.updateRepoUri(targetSourceData.repository.uri);

  const createdTestSourceData = await apiHelpers.getTestSourceData(realTestSourceName);
  await validateTestSource(targetSourceData, createdTestSourceData);

  // // cleanup
  await apiHelpers.removeTestSource(realTestSourceName);
});

test(`Delete test source`, async ({page}) => {
  const testSourceName = 'testsource-k6-testkube-created-1';
  const testSourceData = testDataHandler.getTestSource(testSourceName);
  const realTestSourceName = testSourceData.name;

  await apiHelpers.assureTestSourceCreated(testSourceData);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('sources');

  const testSourcesPage = new TestSourcesPage(page);
  await testSourcesPage.openTestSourceDetails(realTestSourceName);

  const testSourceGeneralSettingsPage = new TestSourceGeneralSettingsPage(page);
  await testSourceGeneralSettingsPage.deleteTestSource(realTestSourceName);

  await page.waitForURL(`**/sources`);
  const isDeleted = !(await apiHelpers.isTestSourceCreated(realTestSourceName));
  expect(isDeleted).toBeTruthy();
});

test.skip(`Test source - definition`, async ({page}) => {});
