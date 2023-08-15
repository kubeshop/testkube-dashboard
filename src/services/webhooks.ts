import {createApi} from '@reduxjs/toolkit/query/react';

import {Webhook} from '@models/webhook';

import {MetadataResponse} from '@src/models/fetch';

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
        method: 'PUT',
        body: webhook,
      }),
    }),
    updateWebhookDefinition: builder.mutation<MetadataResponse<Webhook>, {name: string; definition: string}>({
      query: ({name, definition}) => ({
        url: `/webhooks/${name}`,
        method: 'PUT',
        body: definition,
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
  useUpdateWebhookDefinitionMutation,
  useDeleteWebhookMutation,
} = webhooksApi;
