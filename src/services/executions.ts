import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const executionsApi = createApi({
  reducerPath: 'executionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getExecutions: builder.query({
      query: (filters: any) => {
        return `${filters.testName ? `/tests/${filters.testName}` : ''}/executions?${paramsSerializer(filters)}`;
      },
    }),
    getScriptExecutionById: builder.query({
      query: scriptExecutionId => `/executions/${scriptExecutionId}`,
    }),
    getScriptExecutionArtifacts: builder.query({
      query: testId => `/executions/${testId}/artifacts`,
      // query: (testId) => `618e5291d88b39735423e0c6/artifacts`
    }),
  }),
});

export const {useGetExecutionsQuery, useGetScriptExecutionByIdQuery, useGetScriptExecutionArtifactsQuery} =
  executionsApi;
