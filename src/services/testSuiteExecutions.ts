import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: ({id, last = 7, pageSize = Number.MAX_SAFE_INTEGER}) => {
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
      query: ({id, last = 7, limit = Number.MAX_SAFE_INTEGER}) => {
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

export const {
  useGetTestSuiteExecutionsByTestIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuiteExecutionsApi;
