import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query({
      query: (filters: any) => `/tests?${paramsSerializer(filters)}`,
    }),
    getTestExecutionsById: builder.query({
      query: ({name}) => `/tests/${name}/executions`,
    }),
    getTestExecutionById: builder.query({
      query: (testExecutionId: string) => `/executions/${testExecutionId}`,
    }),
    getTestExecutionArtifacts: builder.query({
      query: (testExecutionId: string) => `/executions/${testExecutionId}/artifacts`,
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionArtifactsQuery,
} = testsApi;
