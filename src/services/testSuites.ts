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
    updateTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
    getTestSuiteExecution: builder.query<any, string>({
      query: executionId => `/test-suites-executions/${executionId}`,
    }),
    getTestSuiteDetails: builder.query<any, string>({
      query: id => `/test-suites/${id}`,
    }),
    addTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetTestSuitesQuery,
  useRunTestSuiteQuery,
  useUpdateTestSuiteMutation,
  useGetTestSuiteExecutionQuery,
  useGetTestSuiteDetailsQuery,
  useAddTestSuiteMutation,
} = testSuitesApi;
