import {createApi} from '@reduxjs/toolkit/query/react';

import {Artifact} from '@models/artifact';
import {TestFilters, TestWithExecution} from '@models/test';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

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
      query: ({id, last = 7, pageSize = Number.MAX_SAFE_INTEGER}) => {
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
      query: ({id, last = 7, limit = Number.MAX_SAFE_INTEGER}) => {
        const queryParams = new URLSearchParams({
          last,
          limit,
        });

        return {
          url: `/tests/${id}/metrics?${queryParams.toString()}`,
        };
      },
    }),
    addTest: builder.mutation<any, any>({
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
    deleteTest: builder.mutation<void, any>({
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
  }),
});

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
} = testsApi;
