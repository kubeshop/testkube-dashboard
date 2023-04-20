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
    getAllTestSuites: builder.query<TestSuiteWithExecution[], void | null>({
      query: () => `/test-suite-with-executions`,
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
    getTestSuiteDefinition: builder.query<string, string>({
      query: id => ({
        url: `/test-suites/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    getTestSuiteDetails: builder.query<any, string>({
      query: id => `/test-suites/${id}`,
    }),
    getTestsListForTestSuite: builder.query<any, string>({
      query: id => `/test-suites/${id}/tests`,
    }),
    addTestSuite: builder.mutation<any, any>({
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
    runTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites/${body.id}/executions`,
        method: 'POST',
        body: body.data,
      }),
    }),
    abortTestSuiteExecution: builder.mutation<void, any>({
      query: ({id, executionId}) => ({
        url: `/test-suites/${id}/executions/${executionId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetTestSuitesQuery,
  useUpdateTestSuiteMutation,
  useGetTestSuiteExecutionQuery,
  useGetTestSuiteDefinitionQuery,
  useGetTestSuiteDetailsQuery,
  useAddTestSuiteMutation,
  useDeleteTestSuiteMutation,
  useRunTestSuiteMutation,
  useGetAllTestSuitesQuery,
  useAbortTestSuiteExecutionMutation,
  useGetTestsListForTestSuiteQuery,
} = testSuitesApi;
