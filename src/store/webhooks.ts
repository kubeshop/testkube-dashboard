import axios from 'axios';
import {StateCreator} from 'zustand';

import {Webhook} from '@models/webhook';

import {getApiEndpoint} from '@services/apiEndpoint';

import {ZustandSlices, connectStore, createStoreFactory} from '@store/utils';

export interface WebhooksSlice {
  createWebhook: (url: string, webhook: Webhook, navigate?: any) => void;
  getWebhooks: (url: string) => void;
  webhooks: Webhook[];
}

const createWebhooksSlice: StateCreator<WebhooksSlice> = set => ({
  webhooks: [],
  getWebhooks: async url => {
    try {
      const apiEndpoint = getApiEndpoint();

      const res = await axios.get<Webhook[]>(`${apiEndpoint}${url}`);

      set({webhooks: res.data});

      return res.data;
    } catch (err) {
      //
    }
  },
  createWebhook: async (url: string, webhook: Webhook, navigate?: any) => {
    try {
      const apiEndpoint = getApiEndpoint();

      const res = await axios.post<Webhook>(`${apiEndpoint}${url}`, webhook);

      set(state => ({webhooks: [...state.webhooks, res.data]}));
      navigate('/webhooks/{webhook.id}');
    } catch (err) {
      //
    }
  },
});

const createWebhooksStore = createStoreFactory(ZustandSlices.Webhooks, createWebhooksSlice);

export const {
  use: useWebhooks,
  useField: useWebhooksField,
  pick: useWebhooksPick,
  sync: useWebhooksSync,
  init: initializeWebhooksStore,
} = connectStore(createWebhooksStore);
