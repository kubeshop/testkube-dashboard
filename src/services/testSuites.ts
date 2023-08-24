import {createApi} from '@reduxjs/toolkit/query/react';

import type {MetadataResponse, YamlEditBody} from '@models/fetch';
import type {Test} from '@models/test';
import type {TestSuiteFilters, TestSuiteWithExecution} from '@models/testSuite';

import {dynamicBaseQuery, memoizeQuery, paramsSerializer} from '@utils/fetchUtils';

export const testSuitesApi = createApi({
  reducerPath: 'testSuitesApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['TestSuite', 'TestSuiteExecution'],
  endpoints: builder => ({
    getTestSuites: builder.query<TestSuiteWithExecution[], TestSuiteFilters>({
      query: filters => ({
        url: `/test-suite-with-executions?${paramsSerializer(filters)}`,
      }),
      providesTags: [{type: 'TestSuite', id: 'LIST'}],
    }),
    getAllTestSuites: builder.query<TestSuiteWithExecution[], void | null>({
      query: () => ({
        url: `/test-suite-with-executions`,
      }),
      providesTags: [{type: 'TestSuite', id: 'LIST'}],
    }),
    updateTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
      invalidatesTags: (res, err, {id}) => [{type: 'TestSuite', id}],
    }),
    getTestSuiteExecution: builder.query<any, string>({
      query: executionId => ({
        url: `/test-suites-executions/${executionId}`,
      }),
      providesTags: (res, err, id) => [{type: 'TestSuiteExecution', id: `LIST/${id}`}],
    }),
    getTestSuiteDefinition: builder.query<string, string>({
      query: id => ({
        url: `/test-suites/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'TestSuite', id}],
    }),
    getTestSuiteDetails: builder.query<any, string>({
      query: id => ({
        url: `/test-suites/${id}`,
      }),
      providesTags: (res, err, id) => [{type: 'TestSuite', id}],
    }),
    getTestsListForTestSuite: builder.query<Test[], string>({
      query: id => ({
        url: `/test-suites/${id}/tests`,
      }),
      providesTags: (res, err, id) => [{type: 'TestSuite', id}],
    }),
    addTestSuite: builder.mutation<MetadataResponse<{name: string; namespace: string}>, any>({
      query: body => ({
        url: `/test-suites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'TestSuite', id: 'LIST'}],
    }),
    deleteTestSuite: builder.mutation<void, string>({
      query: testSuiteId => ({
        url: `/test-suites/${testSuiteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'TestSuite', id: 'LIST'},
        {type: 'TestSuite', id},
      ],
    }),
    runTestSuite: builder.mutation<void, any>({
      query: body => ({
        url: `/test-suites/${body.id}/executions`,
        method: 'POST',
        body: body.data,
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'TestSuite', id},
        {type: 'TestSuiteExecution', id: `LIST/${id}`},
      ],
    }),
    abortTestSuiteExecution: builder.mutation<void, any>({
      query: ({id, executionId}) => ({
        url: `/test-suites/${id}/executions/${executionId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (res, err, {id, executionId}) => [
        {type: 'TestSuite', id},
        {type: 'TestSuiteExecution', id: `LIST/${id}`},
        {type: 'TestSuiteExecution', id: executionId},
      ],
    }),
    abortAllTestSuiteExecutions: builder.mutation<void, any>({
      query: ({id}) => ({
        url: `/test-suites/${id}/abort`,
        method: 'POST',
      }),
      invalidatesTags: (res, err, {id}) => [
        {type: 'TestSuite', id},
        {type: 'TestSuiteExecution', id: `LIST/${id}`},
      ],
    }),
    updateTestSuiteDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/test-suites/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
      invalidatesTags: (res, err, {name: id}) => [{type: 'TestSuite', id}],
    }),
    getTestSuiteExecutionsByTestSuiteId: builder.query({
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
      providesTags: (res, err, {id}) => [
        {type: 'TestSuite', id},
        {type: 'TestSuiteExecution', id: `LIST/${id}`},
      ],
    }),
    getTestSuiteExecutionById: builder.query({
      query: (testSuiteExecutionId: string) => ({
        url: `/test-suite-executions/${testSuiteExecutionId}`,
      }),
      providesTags: (res, err, id) => [{type: 'TestSuiteExecution', id}],
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
      providesTags: (res, err, id) => [
        {type: 'TestSuite', id},
        {type: 'TestSuiteExecution', id: `LIST/${id}`},
      ],
    }),
  }),
});

// Apply optimization
testSuitesApi.useGetTestSuitesQuery = memoizeQuery(testSuitesApi.useGetTestSuitesQuery);
testSuitesApi.useGetTestSuiteDetailsQuery = memoizeQuery(testSuitesApi.useGetTestSuiteDetailsQuery);
testSuitesApi.useGetAllTestSuitesQuery = memoizeQuery(testSuitesApi.useGetAllTestSuitesQuery);
testSuitesApi.useGetTestsListForTestSuiteQuery = memoizeQuery(testSuitesApi.useGetTestsListForTestSuiteQuery);
testSuitesApi.useGetTestSuiteExecutionsByTestSuiteIdQuery = memoizeQuery(
  testSuitesApi.useGetTestSuiteExecutionsByTestSuiteIdQuery,
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
  useGetTestSuiteExecutionsByTestSuiteIdQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
} = testSuitesApi;
