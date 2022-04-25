import {createApi} from '@reduxjs/toolkit/query/react';

import {TestSuiteWithExecution} from '@models/testSuite';
import {TestSuiteFilters} from '@models/testSuites';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testSuitesApi = createApi({
  reducerPath: 'testSuitesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuites: builder.query<TestSuiteWithExecution[], TestSuiteFilters>({
      query: filters => `/test-suite-with-executions?${paramsSerializer(filters)}`,
    }),
    runTestSuite: builder.query<any, string>({
      query: testSuiteName => `/test-suites/${testSuiteName}/run`,
    }),
  }),
});

export const {useGetTestSuitesQuery, useRunTestSuiteQuery} = testSuitesApi;
