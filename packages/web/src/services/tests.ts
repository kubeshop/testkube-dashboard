import {createApi} from '@reduxjs/toolkit/query/react';

import {Artifact} from '@models/artifact';
import {ExecutionStatusEnum, ExecutionsResponse} from '@models/execution';
import {MetadataResponse, YamlEditBody} from '@models/fetch';
import {Test, TestFilters, TestWithExecution} from '@models/test';

import {dynamicBaseQuery, memoizeQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Test', 'TestExecution'],
  endpoints: builder => ({
    getTests: builder.query<TestWithExecution[], TestFilters>({
      query: filters => ({
        url: `/test-with-executions?${paramsSerializer(filters)}`,
      }),
      providesTags: [{type: 'Test', id: 'LIST'}],
    }),
    getAllTests: builder.query<TestWithExecution[], void | null>({
      query: () => ({
        url: `/test-with-executions`,
      }),
      providesTags: [{type: 'Test', id: 'LIST'}],
    }),
    getTestDefinition: builder.query<string, string>({
      query: testId => ({
        url: `/tests/${testId}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'Test', id}],
    }),
    getTest: builder.query<TestWithExecution, string>({
      query: testId => ({
        url: `/tests/${testId}`,
      }),
      providesTags: (res, err, id) => [{type: 'Test', id}],
    }),
    getTestExecutions: builder.query({
      query: ({last = 7, pageSize = 1000}) => {
        const queryParams = new URLSearchParams({
          last,
          pageSize,
        });

        return {
          url: `/executions?${queryParams.toString()}`,
        };
      },
      providesTags: (res, err) => [{type: 'TestExecution', id: 'LIST'}],
    }),
    getTestExecutionsById: builder.query<
      ExecutionsResponse,
      {id: string; last?: number; pageSize?: number; textSearch?: string; status?: ExecutionStatusEnum[]}
    >({
      query: ({id, last, pageSize = 1000, textSearch, status}) => {
        const queryParams = new URLSearchParams({
          ...(last ? {last: last.toString()} : null),
          pageSize: pageSize.toString(),
        });

        if (textSearch) {
          queryParams.append('textSearch', textSearch);
        }

        if (status?.length) {
          status.forEach(s => queryParams.append('status', s));
        }

        return {
          url: `/tests/${id}/executions?${queryParams.toString()}`,
        };
      },
      providesTags: (res, err, {id}) => [
        {type: 'Test', id},
        {type: 'TestExecution', id: `LIST/${id}`},
      ],
    }),
    getTestExecutionById: builder.query<any, string>({
      query: testExecutionId => ({
        url: `/executions/${testExecutionId}`,
      }),
      providesTags: (res, err, id) => [{type: 'TestExecution', id}],
    }),
    getTestExecutionArtifacts: builder.query<Artifact[], string>({
      query: testExecutionId => ({
        url: `/executions/${testExecutionId}/artifacts`,
      }),
      providesTags: (res, err, id) => [{type: 'TestExecution', id}],
    }),
    getTestExecutionMetrics: builder.query({
      query: ({id, last, limit = 1000}) => {
        const queryParams = new URLSearchParams({
          ...(last ? {last: last.toString()} : null),
          limit,
        });

        return {
          url: `/tests/${id}/metrics?${queryParams.toString()}`,
        };
      },
      providesTags: (res, err, id) => [
        {type: 'Test', id},
        {type: 'TestExecution', id: `LIST/${id}`},
      ],
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
      invalidatesTags: [{type: 'Test', id: 'LIST'}],
    }),
    updateTest: builder.mutation<void, any>({
      query: body => ({
        url: `/tests/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
      invalidatesTags: (res, err, {id}) => [
        {type: 'Test', id: 'LIST'},
        {type: 'Test', id},
      ],
    }),
    deleteTest: builder.mutation<void, string>({
      query: testId => ({
        url: `/tests/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'Test', id: 'LIST'},
        {type: 'Test', id},
        {type: 'TestExecution', id: `LIST/${id}`},
      ],
    }),
    runTest: builder.mutation<void, any>({
      query: body => ({
        url: `/tests/${body.id}/executions`,
        method: 'POST',
        body: body.data,
      }),
      invalidatesTags: (res, err, {id}) => [
        {type: 'Test', id: 'LIST'},
        {type: 'Test', id},
      ],
    }),
    abortTestExecution: builder.mutation<void, any>({
      query: ({id, executionId}) => ({
        url: `/tests/${id}/executions/${executionId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (res, err, {id, executionId}) => [
        {type: 'TestExecution', id: `LIST/${id}`},
        {type: 'TestExecution', id: executionId},
      ],
    }),
    abortAllTestExecutions: builder.mutation<void, any>({
      query: ({id}) => ({
        url: `/tests/${id}/abort`,
        method: 'POST',
      }),
      invalidatesTags: (res, err, {id}) => [{type: 'TestExecution', id: `LIST/${id}`}],
    }),
    updateTestDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/tests/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Test', id},
        {type: 'TestExecution', id: `LIST/${id}`},
      ],
    }),
  }),
});

// Apply optimization
testsApi.useGetTestQuery = memoizeQuery(testsApi.useGetTestQuery);
testsApi.useGetTestsQuery = memoizeQuery(testsApi.useGetTestsQuery);
testsApi.useGetAllTestsQuery = memoizeQuery(testsApi.useGetAllTestsQuery);
testsApi.useGetTestExecutionsQuery = memoizeQuery(testsApi.useGetTestExecutionsQuery);
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
  useGetTestExecutionsQuery,
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
