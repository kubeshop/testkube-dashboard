import {createApi} from '@reduxjs/toolkit/query/react';

import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const triggersApi = createApi({
  reducerPath: 'triggersApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTriggersKeyMap: builder.query<TriggersKeyMap, void | null>({
      query: () => ({url: `/keymap/triggers`}),
    }),
    getTriggersList: builder.query<TestTrigger[], void | null>({
      query: () => ({url: `/triggers`}),
    }),
    getTriggerById: builder.query<TestTrigger, string>({
      query: id => ({
        url: `/triggers/${id}`,
      }),
    }),
    getTriggerDefinition: builder.query<string, string>({
      query: id => ({
        url: `/triggers/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    createTrigger: builder.mutation<any, any>({
      query: body => ({
        url: `/triggers`,
        method: 'POST',
        body,
      }),
    }),
    updateTriggerById: builder.mutation<TestTrigger, TestTrigger>({
      query: body => {
        return {
          url: `/triggers/${body.name}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    updateTriggers: builder.mutation<void, any>({
      query: body => ({
        url: `/triggers`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteTrigger: builder.mutation<void, string>({
      query: id => ({
        url: `/triggers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Apply optimization
triggersApi.useGetTriggersKeyMapQuery = memoizeQuery(triggersApi.useGetTriggersKeyMapQuery);
triggersApi.useGetTriggersListQuery = memoizeQuery(triggersApi.useGetTriggersListQuery);

export const {
  useGetTriggersKeyMapQuery,
  useCreateTriggerMutation,
  useGetTriggersListQuery,
  useUpdateTriggersMutation,
  useGetTriggerByIdQuery,
  useGetTriggerDefinitionQuery,
  useDeleteTriggerMutation,
  useUpdateTriggerByIdMutation,
} = triggersApi;
