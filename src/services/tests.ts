import {createApi} from '@reduxjs/toolkit/query/react';

import {Artifact} from '@models/artifact';
import {MetadataResponse, YamlEditBody} from '@models/fetch';
import {Test, TestFilters, TestWithExecution} from '@models/test';

import {dynamicBaseQuery, memoizeQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query<TestWithExecution[], TestFilters>({
      query: filters => ({
        url: `/test-with-executions?${paramsSerializer(filters)}`,
      }),
    }),
    getAllTests: builder.query<TestWithExecution[], void | null>({
      query: () => ({
        url: `/test-with-executions`,
      }),
    }),
    getTestDefinition: builder.query<string, string>({
      query: testId => ({
        url: `/tests/${testId}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    getTest: builder.query<TestWithExecution, string>({
      query: testId => ({
        url: `/tests/${testId}`,
      }),
    }),
    getTestExecutionsById: builder.query({
      query: ({id, last = 7, pageSize = 1000}) => {
        const queryParams = new URLSearchParams({
          last,
          pageSize,
        });

        return {
          url: `/tests/${id}/executions?${queryParams.toString()}`,
        };
      },
    }),
    getTestExecutionById: builder.query<any, string>({
      query: testExecutionId => ({
        url: `/executions/${testExecutionId}`,
      }),
    }),
    getTestExecutionArtifacts: builder.query<Artifact[], string>({
      query: testExecutionId => ({
        url: `/executions/${testExecutionId}/artifacts`,
      }),
    }),
    getTestExecutionMetrics: builder.query({
      query: ({id, last = 7, limit = 1000}) => {
        const queryParams = new URLSearchParams({
          last,
          limit,
        });

        return {
          url: `/tests/${id}/metrics?${queryParams.toString()}`,
        };
      },
    }),
    addTest: builder.mutation<MetadataResponse<Test>, any>({
      query: ({headers = {}, ...rest}) => {
        return {
          url: `/tests`,
          method: 'POST',
          body: rest,
          headers,
        };
      },
    }),
    updateTest: builder.mutation<void, any>({
      query: body => ({
        url: `/tests/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
    deleteTest: builder.mutation<void, string>({
      query: testId => ({
        url: `/tests/${testId}`,
        method: 'DELETE',
      }),
    }),
    runTest: builder.mutation<void, any>({
      query: body => ({
        url: `/tests/${body.id}/executions`,
        method: 'POST',
        body: body.data,
      }),
    }),
    abortTestExecution: builder.mutation<void, any>({
      query: ({id, executionId}) => ({
        url: `/tests/${id}/executions/${executionId}`,
        method: 'PATCH',
      }),
    }),
    abortAllTestExecutions: builder.mutation<void, any>({
      query: ({id}) => ({
        url: `/tests/${id}/abort`,
        method: 'POST',
      }),
    }),
    updateTestDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/tests/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
    }),
  }),
});

// Apply optimization
testsApi.useGetTestQuery = memoizeQuery(testsApi.useGetTestQuery);
testsApi.useGetTestsQuery = memoizeQuery(testsApi.useGetTestsQuery);
testsApi.useGetAllTestsQuery = memoizeQuery(testsApi.useGetAllTestsQuery);
testsApi.useGetTestExecutionsByIdQuery = memoizeQuery(testsApi.useGetTestExecutionsByIdQuery, executions =>
  // Limit to show maximum of 1000 latest executions
  executions.results?.length > 1000 ? {...executions, results: executions.results.slice(0, 1000)} : executions
);
testsApi.useGetTestExecutionByIdQuery = memoizeQuery(testsApi.useGetTestExecutionByIdQuery);
testsApi.useGetTestExecutionArtifactsQuery = memoizeQuery(testsApi.useGetTestExecutionArtifactsQuery);
testsApi.useGetTestExecutionMetricsQuery = memoizeQuery(testsApi.useGetTestExecutionMetricsQuery, metrics =>
  // Limit to show maximum of 1000 latest executions
  metrics.executions?.length > 1000 ? {...metrics, executions: metrics.executions.slice(0, 1000)} : metrics
);

export const {
  useGetTestDefinitionQuery,
  useGetTestQuery,
  useGetTestsQuery,
  useGetAllTestsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionArtifactsQuery,
  useAddTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useGetTestExecutionMetricsQuery,
  useRunTestMutation,
  useAbortTestExecutionMutation,
  useAbortAllTestExecutionsMutation,
  useUpdateTestDefinitionMutation,
} = testsApi;
