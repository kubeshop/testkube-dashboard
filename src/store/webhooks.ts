import {StateCreator} from 'zustand';

import {Webhook} from '@models/webhook';

import {connectStore, createStoreFactory} from '@store/utils';

interface WebhooksSlice {
  current?: Webhook;
}

const createWebhooksSlice: StateCreator<WebhooksSlice> = set => ({
  current: undefined,
});

const createWebhooksStore = createStoreFactory('Webhooks', createWebhooksSlice);

export const {
  use: useWebhooks,
  useField: useWebhooksField,
  pick: useWebhooksPick,
  sync: useWebhooksSync,
  init: initializeWebhooksStore,
} = connectStore(createWebhooksStore);
