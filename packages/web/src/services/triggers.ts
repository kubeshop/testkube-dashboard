import {createApi} from '@reduxjs/toolkit/query/react';

import {YamlEditBody} from '@models/fetch';
import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const triggersApi = createApi({
  reducerPath: 'triggersApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Trigger'],
  endpoints: builder => ({
    getTriggersKeyMap: builder.query<TriggersKeyMap, void | null>({
      query: () => ({url: `/keymap/triggers`}),
    }),
    getTriggersList: builder.query<TestTrigger[], void | null>({
      query: () => ({url: `/triggers`}),
      providesTags: [{type: 'Trigger', id: 'LIST'}],
    }),
    getTriggerById: builder.query<TestTrigger, string>({
      query: id => ({
        url: `/triggers/${id}`,
      }),
      providesTags: (res, err, id) => [{type: 'Trigger', id}],
    }),
    getTriggerDefinition: builder.query<string, string>({
      query: id => ({
        url: `/triggers/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'Trigger', id}],
    }),
    createTrigger: builder.mutation<any, any>({
      query: body => ({
        url: `/triggers`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Trigger', id: 'LIST'}],
    }),
    updateTriggerById: builder.mutation<TestTrigger, TestTrigger>({
      query: body => ({
        url: `/triggers/${body.name}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Trigger', id: 'LIST'},
        {type: 'Trigger', id},
      ],
    }),
    updateTriggerDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/triggers/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Trigger', id: 'LIST'},
        {type: 'Trigger', id},
      ],
    }),
    deleteTrigger: builder.mutation<void, string>({
      query: id => ({
        url: `/triggers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'Trigger', id: 'LIST'},
        {type: 'Trigger', id},
      ],
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
  useGetTriggerByIdQuery,
  useGetTriggerDefinitionQuery,
  useDeleteTriggerMutation,
  useUpdateTriggerByIdMutation,
  useUpdateTriggerDefinitionMutation,
} = triggersApi;
