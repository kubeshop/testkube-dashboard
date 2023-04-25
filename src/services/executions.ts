import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const executionsApi = createApi({
  reducerPath: 'executionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getExecutions: builder.query({
      query: (filters: any) => ({
        url: `${filters.testName ? `/tests/${filters.testName}` : ''}/executions?${paramsSerializer(filters)}`,
      }),
    }),
    getScriptExecutionById: builder.query({
      query: scriptExecutionId => ({url: `/executions/${scriptExecutionId}`}),
    }),
    getScriptExecutionArtifacts: builder.query({
      query: testId => ({
        url: `/executions/${testId}/artifacts`,
      }),
    }),
  }),
});

export const {useGetExecutionsQuery, useGetScriptExecutionByIdQuery, useGetScriptExecutionArtifactsQuery} =
  executionsApi;
