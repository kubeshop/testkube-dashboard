import {createApi} from '@reduxjs/toolkit/query/react';

import {MetadataResponse, YamlEditBody} from '@models/fetch';
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
    updateTestSuiteDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/test-suites/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
    }),
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
testSuitesApi.useGetTestSuitesQuery = memoizeQuery(testSuitesApi.useGetTestSuitesQuery);
testSuitesApi.useGetTestSuiteDetailsQuery = memoizeQuery(testSuitesApi.useGetTestSuiteDetailsQuery);
testSuitesApi.useGetAllTestSuitesQuery = memoizeQuery(testSuitesApi.useGetAllTestSuitesQuery);
testSuitesApi.useGetTestsListForTestSuiteQuery = memoizeQuery(testSuitesApi.useGetTestsListForTestSuiteQuery);
testSuitesApi.useGetTestSuiteExecutionsByTestIdQuery = memoizeQuery(
  testSuitesApi.useGetTestSuiteExecutionsByTestIdQuery,
  executions =>
    // Limit to show maximum of 1000 latest executions
    executions.results?.length > 1000 ? {...executions, results: executions.results.slice(0, 1000)} : executions
);
testSuitesApi.useGetTestSuiteExecutionByIdQuery = memoizeQuery(testSuitesApi.useGetTestSuiteExecutionByIdQuery);
testSuitesApi.useGetTestSuiteExecutionMetricsQuery = memoizeQuery(
  testSuitesApi.useGetTestSuiteExecutionMetricsQuery,
  metrics =>
    // Limit to show maximum of 1000 latest executions
    metrics.executions?.length > 1000 ? {...metrics, executions: metrics.executions.slice(0, 1000)} : metrics
);

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
  useUpdateTestSuiteDefinitionMutation,
  useGetTestSuiteExecutionsByTestIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuitesApi;
