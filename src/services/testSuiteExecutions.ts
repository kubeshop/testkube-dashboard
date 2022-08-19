import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: id => `/test-suite-executions?id=${id}`,
    }),
    getTestSuiteExecutionById: builder.query({
      query: (testSuiteExecutionId: string) => `/test-suite-executions/${testSuiteExecutionId}`,
    }),
    getTestSuiteExecutionMetrics: builder.query({
      query: ({id, limit = undefined}) => `/test-suites/${id}/metrics${limit ? `?limit=${limit}` : ''}`,
    }),
  }),
});

export const {
  useGetTestSuiteExecutionsByTestIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuiteExecutionsApi;
