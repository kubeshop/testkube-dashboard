import {createApi} from '@reduxjs/toolkit/query/react';

import {TestSuiteFilters, TestSuiteWithExecution} from '@models/testSuite';

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
    deleteTestSuite: builder.mutation<void, any>({
      query: testSuiteId => ({
        url: `/test-suites/${testSuiteId}`,
        method: 'DELETE',
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
  useDeleteTestSuiteMutation,
} = testSuitesApi;
