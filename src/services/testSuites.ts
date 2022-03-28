import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testSuitesApi = createApi({
  reducerPath: 'testSuitesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuites: builder.query({
      query: (filters: any) => `/test-suites?${paramsSerializer(filters)}`,
    }),
    runTestSuite: builder.query({
      query: (testSuiteName: string) => `/test-suites/${testSuiteName}/run`,
    }),
  }),
});

export const {useGetTestSuitesQuery, useRunTestSuiteQuery} = testSuitesApi;
