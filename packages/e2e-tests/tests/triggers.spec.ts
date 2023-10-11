import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateTrigger} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateTriggerPage} from '../pages/CreateTriggerPage';
import {MainPage} from '../pages/MainPage';
import {NavigationSiderPage} from '../pages/NavigationSiderPage';
import {TriggersPage} from '../pages/TriggersPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

test(`Create Trigger`, async ({page}) => {
  const triggerName = 'trigger-deployment-creation-name-test-name';
  const triggerData = testDataHandler.getTrigger(triggerName);
  const realTriggerName = triggerData.name;

  await api.assureTriggerNotCreated(realTriggerName);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('triggers');

  const triggersPage = new TriggersPage(page);
  await triggersPage.openCreateTriggerDialog();

  const createTriggerPage = new CreateTriggerPage(page);
  await createTriggerPage.createTrigger(triggerData);
  await page.waitForURL(`**/triggers/${realTriggerName}`);

  const createdTriggerData = await api.getTriggerData(realTriggerName);
  await validateTrigger(triggerData, createdTriggerData);

  // Cleanup
  await api.removeTrigger(realTriggerName);
});

test.skip(`Edit Trigger`, async ({page}) => {});

test.skip(`Delete Trigger`, async ({page}) => {});
