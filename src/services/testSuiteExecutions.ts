import {createApi} from '@reduxjs/toolkit/query/react';

import {addIndexes} from '@utils/array';
import {dynamicBaseQuery} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: id => `/test-suites/${id}/executions`,
      transformResponse: (response: any, meta, arg) => {
        const {results, ...rest} = response;

        const indexedResults = addIndexes(results);

        return {results: indexedResults, ...rest};
      },
    }),
    getTestSuiteExecutionById: builder.query({
      query: (testSuiteExecutionId: string) => `/test-suite-executions/${testSuiteExecutionId}`,
    }),
  }),
});

export const {useGetTestSuiteExecutionsByTestIdQuery, useGetTestSuiteExecutionByIdQuery} = testSuiteExecutionsApi;
