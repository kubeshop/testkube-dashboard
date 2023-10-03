import {test} from '@playwright/test';

import config from '../config';
import {ApiHelpers} from '../helpers/api-helpers';
import {validateWebhook} from '../helpers/common';
import {TestDataHandler} from '../helpers/test-data-handler';
import {CreateWebhookPage} from '../pages/CreateWebhookPage';
import {MainPage} from '../pages/MainPage';
import {NavigationSiderPage} from '../pages/NavigationSiderPage';
import {WebhooksPage} from '../pages/WebhooksPage';

const api = new ApiHelpers(config.apiUrl, config.cloudContext, config.bearerToken);
const testDataHandler = new TestDataHandler(config.runId);

test(`Create a webhook`, async ({page}) => {
  const webhookName = 'temp-wh-on-test-start';
  const webhookData = testDataHandler.getWebhook(webhookName);
  const realWebhookName = webhookData.name;

  await api.assureWebhookNotCreated(realWebhookName);

  const mainPage = new MainPage(page);
  await mainPage.visitMainPage();

  const navigationSiderPage = new NavigationSiderPage(page);
  await navigationSiderPage.openMenuItem('webhooks');

  const webhooksPage = new WebhooksPage(page);
  await webhooksPage.openCreateWebhookDialog();

  const createWebhookPage = new CreateWebhookPage(page);
  await createWebhookPage.createWebhook(webhookData);
  await page.waitForURL(`**/webhooks/${realWebhookName}`);

  const createdWebhookData = await api.getWebhookData(realWebhookName);
  await validateWebhook(webhookData, createdWebhookData);

  // Cleanup
  await api.removeWebhook(realWebhookName);
});

test.skip(`Trigger a webhook`, async ({page}) => {});

test.skip(`Edit a webhook`, async ({page}) => {});

test.skip(`Delete a webhook`, async ({page}) => {});
