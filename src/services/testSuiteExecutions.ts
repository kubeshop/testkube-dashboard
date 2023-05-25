import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: ({id, last = 7, pageSize = 1000}) => {
        const queryParams = new URLSearchParams({
          id,
          last,
          pageSize,
        });

        return {
          url: `/test-suite-executions?${queryParams.toString()}`,
        };
      },
    }),
    getTestSuiteExecutionById: builder.query({
      query: (testSuiteExecutionId: string) => ({
        url: `/test-suite-executions/${testSuiteExecutionId}`,
      }),
    }),
    getTestSuiteExecutionMetrics: builder.query({
      query: ({id, last = 7, limit = 1000}) => {
        const queryParams = new URLSearchParams({
          last,
          limit,
        });

        return {
          url: `/test-suites/${id}/metrics?${queryParams.toString()}`,
        };
      },
    }),
  }),
});

// Apply optimization
testSuiteExecutionsApi.useGetTestSuiteExecutionsByTestIdQuery = memoizeQuery(
  testSuiteExecutionsApi.useGetTestSuiteExecutionsByTestIdQuery,
  executions =>
    // Limit to show maximum of 1000 latest executions
    executions.results?.length > 1000 ? {...executions, results: executions.results.slice(0, 1000)} : executions
);
testSuiteExecutionsApi.useGetTestSuiteExecutionByIdQuery = memoizeQuery(
  testSuiteExecutionsApi.useGetTestSuiteExecutionByIdQuery
);
testSuiteExecutionsApi.useGetTestSuiteExecutionMetricsQuery = memoizeQuery(
  testSuiteExecutionsApi.useGetTestSuiteExecutionMetricsQuery,
  metrics =>
    // Limit to show maximum of 1000 latest executions
    metrics.executions?.length > 1000 ? {...metrics, executions: metrics.executions.slice(0, 1000)} : metrics
);

export const {
  useGetTestSuiteExecutionsByTestIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuiteExecutionsApi;
