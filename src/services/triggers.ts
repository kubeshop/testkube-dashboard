import {createApi} from '@reduxjs/toolkit/query/react';

import {TriggersKeymap} from '@models/triggers';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const triggersApi = createApi({
  reducerPath: 'triggersApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTriggersKeymap: builder.query<TriggersKeymap, void>({
      query: () => `/keymap/triggers`,
    }),
    getTriggersList: builder.query<any, void>({
      query: () => `/triggers`,
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

export const {useGetTriggersKeymapQuery, useCreateTriggerMutation, useGetTriggersListQuery, useUpdateTriggersMutation} =
  triggersApi;
