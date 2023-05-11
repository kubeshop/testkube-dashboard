import {createApi} from '@reduxjs/toolkit/query/react';

import {MetadataResponse} from '@models/fetch';
import {Test} from '@models/test';
import {TestSuiteFilters, TestSuiteWithExecution} from '@models/testSuite';

import {dynamicBaseQuery, memoizeQuery, paramsSerializer} from '@utils/fetchUtils';

export const testSuitesApi = createApi({
  reducerPath: 'testSuitesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuites: builder.query<TestSuiteWithExecution[], TestSuiteFilters>({
      query: filters => ({
        url: `/test-suite-with-executions?${paramsSerializer(filters)}`,
      }),
    }),
    getAllTestSuites: builder.query<TestSuiteWithExecution[], void | null>({
      query: () => ({
        url: `/test-suite-with-executions`,
      }),
    }),
    updateTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
    getTestSuiteExecution: builder.query<any, string>({
      query: executionId => ({
        url: `/test-suites-executions/${executionId}`,
      }),
    }),
    getTestSuiteDefinition: builder.query<string, string>({
      query: id => ({
        url: `/test-suites/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    getTestSuiteDetails: builder.query<any, string>({
      query: id => ({
        url: `/test-suites/${id}`,
      }),
    }),
    getTestsListForTestSuite: builder.query<Test[], string>({
      query: id => ({
        url: `/test-suites/${id}/tests`,
      }),
    }),
    addTestSuite: builder.mutation<MetadataResponse<{name: string; namespace: string}>, any>({
      query: body => ({
        url: `/test-suites`,
        method: 'POST',
        body,
      }),
    }),
    deleteTestSuite: builder.mutation<void, string>({
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
    abortAllTestSuiteExecutions: builder.mutation<void, any>({
      query: ({id}) => ({
        url: `/test-suites/${id}/abort`,
        method: 'POST',
      }),
    }),
  }),
});

// Apply optimization
testSuitesApi.useGetTestSuitesQuery = memoizeQuery(testSuitesApi.useGetTestSuitesQuery);
testSuitesApi.useGetTestSuiteDetailsQuery = memoizeQuery(testSuitesApi.useGetTestSuiteDetailsQuery);
testSuitesApi.useGetAllTestSuitesQuery = memoizeQuery(testSuitesApi.useGetAllTestSuitesQuery);
testSuitesApi.useGetTestsListForTestSuiteQuery = memoizeQuery(testSuitesApi.useGetTestsListForTestSuiteQuery);

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
  useAbortAllTestSuiteExecutionsMutation,
} = testSuitesApi;
