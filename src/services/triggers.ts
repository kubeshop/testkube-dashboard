import {createApi} from '@reduxjs/toolkit/query/react';

import {TestTrigger, TriggersKeyMap} from '@models/triggers';

import {dynamicBaseQuery} from '@utils/fetchUtils';

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
    createTrigger: builder.mutation<any, any>({
      query: body => ({
        url: `/triggers`,
        method: 'POST',
        body,
      }),
    }),
    updateTriggers: builder.mutation<void, any>({
      query: body => ({
        url: `/triggers`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {useGetTriggersKeyMapQuery, useCreateTriggerMutation, useGetTriggersListQuery, useUpdateTriggersMutation} =
  triggersApi;
