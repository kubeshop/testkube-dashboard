import {createApi} from '@reduxjs/toolkit/query/react';

import {Executor} from '@models/executors';

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
    createExecutor: builder.mutation<void, any>({
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
    deleteExecutor: builder.mutation<void, any>({
      query: id => ({
        url: `/executors/${id}`,
        method: 'DELETE',
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
} = executorsApi;
