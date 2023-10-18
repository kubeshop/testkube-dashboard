import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as WebhooksIcon} from '@assets/webhooks.svg';

import type GeneralPlugin from '@plugins/general/plugin';

import {
  initializeWebhooksStore,
  useWebhooks,
  useWebhooksField,
  useWebhooksPick,
  useWebhooksSync,
} from '@store/webhooks';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Add routes
export default createPlugin('oss/webhooks')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .provider(tk => <StoreProvider store={initializeWebhooksStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useWebhooks, useWebhooksPick, useWebhooksField, useWebhooksSync})
  .init(tk => {
    tk.slots.siderItems.add({path: '/webhooks', icon: WebhooksIcon, title: 'Webhooks'}, {order: -40});
  });
