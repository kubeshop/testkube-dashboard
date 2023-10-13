import {createApi} from '@reduxjs/toolkit/query/react';

import {MetadataResponse} from '@models/fetch';
import {Webhook} from '@models/webhook';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const webhooksApi = createApi({
  reducerPath: 'webhooksApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Webhook'],
  endpoints: builder => ({
    getWebhooks: builder.query({
      query: () => ({
        url: '/webhooks',
      }),
      providesTags: [{type: 'Webhook', id: 'LIST'}],
    }),
    getWebhookDetails: builder.query<Webhook, string>({
      query: name => ({
        url: `/webhooks/${name}`,
      }),
      providesTags: (res, err, id) => [{type: 'Webhook', id}],
    }),
    createWebhook: builder.mutation<MetadataResponse<Webhook>, Webhook>({
      query: webhook => ({
        url: '/webhooks',
        method: 'POST',
        body: webhook,
      }),
      invalidatesTags: [{type: 'Webhook', id: 'LIST'}],
    }),
    getWebhookDefinition: builder.query<Webhook, string>({
      query: name => ({
        url: `/webhooks/${name}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'Webhook', id}],
    }),
    updateWebhook: builder.mutation<MetadataResponse<Webhook>, Webhook>({
      query: webhook => ({
        url: `/webhooks/${webhook.name}`,
        method: 'PATCH',
        body: webhook,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Webhook', id: 'LIST'},
        {type: 'Webhook', id},
      ],
    }),
    updateWebhookDefinition: builder.mutation<MetadataResponse<Webhook>, {name: string; value: string}>({
      query: ({name, value}) => ({
        url: `/webhooks/${name}`,
        method: 'PATCH',
        body: value,
        headers: {'Content-Type': 'text/yaml'},
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Webhook', id: 'LIST'},
        {type: 'Webhook', id},
      ],
    }),
    deleteWebhook: builder.mutation<void, string>({
      query: name => ({
        url: `/webhooks/${name}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'Webhook', id: 'LIST'},
        {type: 'Webhook', id},
      ],
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
