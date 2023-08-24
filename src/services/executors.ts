import {createApi} from '@reduxjs/toolkit/query/react';

import type {Executor} from '@models/executors';
import type {MetadataResponse, YamlEditBody} from '@models/fetch';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const executorsApi = createApi({
  reducerPath: 'executorsApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Executor'],
  endpoints: builder => ({
    getExecutors: builder.query<Executor[], null | void>({
      query: () => ({
        url: `/executors`,
      }),
      providesTags: [{type: 'Executor', id: 'LIST'}],
    }),
    createExecutor: builder.mutation<MetadataResponse<{name: string}>, any>({
      query: body => ({
        url: `/executors`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Executor', id: 'LIST'}],
    }),
    updateCustomExecutor: builder.mutation<void, any>({
      query: ({body, executorId}) => ({
        url: `/executors/${executorId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (res, err, {executorId: id}) => [
        {type: 'Executor', id: 'LIST'},
        {type: 'Executor', id},
      ],
    }),
    getExecutorDefinition: builder.query<string, string>({
      query: id => ({
        url: `/executors/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'Executor', id}],
    }),
    getExecutorDetails: builder.query<any, string>({
      query: id => ({
        url: `/executors/${id}`,
      }),
      providesTags: (res, err, id) => [{type: 'Executor', id}],
    }),
    deleteExecutor: builder.mutation<void, string>({
      query: id => ({
        url: `/executors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'Executor', id: 'LIST'},
        {type: 'Executor', id},
      ],
    }),
    updateExecutorDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/executors/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Executor', id: 'LIST'},
        {type: 'Executor', id},
      ],
    }),
  }),
});

// Apply optimization
executorsApi.useGetExecutorsQuery = memoizeQuery(executorsApi.useGetExecutorsQuery);

export const {
  useGetExecutorsQuery,
  useCreateExecutorMutation,
  useGetExecutorDefinitionQuery,
  useGetExecutorDetailsQuery,
  useDeleteExecutorMutation,
  useUpdateCustomExecutorMutation,
  useUpdateExecutorDefinitionMutation,
} = executorsApi;
