import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: ({id, last}) => `/test-suite-executions?id=${id}${last ? `&last=${last}` : ''}`,
    }),
    getTestSuiteExecutionById: builder.query({
      query: (testSuiteExecutionId: string) => `/test-suite-executions/${testSuiteExecutionId}`,
    }),
    getTestSuiteExecutionMetrics: builder.query({
      query: ({id, limit = undefined, last = 7}) =>
        `/test-suites/${id}/metrics?last=${last ? `?last=${last}` : ''}${limit ? `&limit=${limit}` : ''}`,
    }),
  }),
});

export const {
  useGetTestSuiteExecutionsByTestIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuiteExecutionsApi;
