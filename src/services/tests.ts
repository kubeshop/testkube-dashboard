import {createApi} from '@reduxjs/toolkit/query/react';

import {Artifact} from '@models/artifact';
import {TestFilters, TestWithExecution} from '@models/test';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query<TestWithExecution[], TestFilters>({
      query: filters => `/test-with-executions?${paramsSerializer(filters)}`,
    }),
    getAllTests: builder.query<TestWithExecution[], void | null>({
      query: () => `/test-with-executions`,
    }),
    getTest: builder.query<TestWithExecution, string>({
      query: testId => `/tests/${testId}`,
    }),
    getTestExecutionsById: builder.query({
      query: ({id, last = 7, pageSize = Number.MAX_SAFE_INTEGER}) => {
        const queryParams = new URLSearchParams({
          last,
          pageSize,
        });

        return `/tests/${id}/executions?${queryParams.toString()}`;
      },
    }),
    getTestExecutionById: builder.query<any, string>({
      query: testExecutionId => `/executions/${testExecutionId}`,
    }),
    getTestExecutionArtifacts: builder.query<Artifact[], string>({
      query: testExecutionId => `/executions/${testExecutionId}/artifacts`,
    }),
    getTestExecutionMetrics: builder.query({
      query: ({id, last = 7}) => `/tests/${id}/metrics${last ? `?last=${last}` : ''}`,
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
