import {createApi} from '@reduxjs/toolkit/query/react';

import {Executor} from '@models/executors';
import {MetadataResponse, YamlEditBody} from '@models/fetch';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const executorsApi = createApi({
  reducerPath: 'executorsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getExecutors: builder.query<Executor[], null | void>({
      query: () => ({
        url: `/executors`,
      }),
    }),
    createExecutor: builder.mutation<MetadataResponse<{name: string}>, any>({
      query: body => ({
        url: `/executors`,
        method: 'POST',
        body,
      }),
    }),
    updateCustomExecutor: builder.mutation<void, any>({
      query: ({body, executorId}) => ({
        url: `/executors/${executorId}`,
        method: 'PATCH',
        body,
      }),
    }),
    getExecutorDefinition: builder.query<string, string>({
      query: id => ({
        url: `/executors/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    getExecutorDetails: builder.query<any, string>({
      query: id => ({
        url: `/executors/${id}`,
      }),
    }),
    deleteExecutor: builder.mutation<void, string>({
      query: id => ({
        url: `/executors/${id}`,
        method: 'DELETE',
      }),
    }),
    updateExecutorDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/executors/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
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
