import {createApi} from '@reduxjs/toolkit/query/react';

import {MetadataResponse} from '@models/fetch';
import {Webhook} from '@models/webhook';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const webhooksApi = createApi({
  reducerPath: 'webhooksApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getWebhooks: builder.query({
      query: () => ({
        url: '/webhooks',
      }),
    }),
    getWebhookDetails: builder.query<Webhook, string>({
      query: name => ({
        url: `/webhooks/${name}`,
      }),
    }),
    createWebhook: builder.mutation<MetadataResponse<Webhook>, Webhook>({
      query: webhook => ({
        url: '/webhooks',
        method: 'POST',
        body: webhook,
      }),
    }),
    getWebhookDefinition: builder.query<Webhook, string>({
      query: name => ({
        url: `/webhooks/${name}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    updateWebhook: builder.mutation<MetadataResponse<Webhook>, Webhook>({
      query: webhook => ({
        url: `/webhooks/${webhook.name}`,
        method: 'PATCH',
        body: webhook,
      }),
    }),
    updateWebhookDefinition: builder.mutation<MetadataResponse<Webhook>, {name: string; value: string}>({
      query: ({name, value}) => ({
        url: `/webhooks/${name}`,
        method: 'PATCH',
        body: value,
        headers: {accept: 'text/yaml'},
      }),
    }),
    deleteWebhook: builder.mutation<void, string>({
      query: name => ({
        url: `/webhooks/${name}`,
        method: 'DELETE',
      }),
    }),
  }),
});

webhooksApi.useGetWebhooksQuery = memoizeQuery(webhooksApi.useGetWebhooksQuery);

export const {
  useGetWebhooksQuery,
  useCreateWebhookMutation,
  useGetWebhookDetailsQuery,
  useGetWebhookDefinitionQuery,
  useUpdateWebhookMutation,
  useUpdateWebhookDefinitionMutation,
  useDeleteWebhookMutation,
} = webhooksApi;
