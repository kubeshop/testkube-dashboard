import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as WebhooksIcon} from '@assets/webhooks.svg';

import WebhookDetails from '@pages/Webhooks/WebhookDetails/WebhookDetails';
import WebhooksList from '@pages/Webhooks/WebhooksList';

import type GeneralPlugin from '@plugins/general/plugin';
import RtkPlugin from '@plugins/rtk/plugin';

import {webhooksApi} from '@services/webhooks';

import {
  initializeWebhooksStore,
  useWebhooks,
  useWebhooksField,
  useWebhooksPick,
  useWebhooksSync,
} from '@store/webhooks';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/webhooks')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))

  .route('/webhooks', <WebhooksList />)
  .route('/webhooks/:id', <WebhookDetails />)
  .route('/webhooks/:id/settings', <WebhookDetails />)
  .route('/webhooks/:id/settings/:settingsTab', <WebhookDetails />)

  .provider(({useData}) => (
    <StoreProvider store={initializeWebhooksStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useWebhooks, useWebhooksPick, useWebhooksField, useWebhooksSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/webhooks', icon: WebhooksIcon, title: 'Webhooks'}, {order: -40});
  });

RtkPlugin.overlay.appendContext({
  webhooksApi,
});
