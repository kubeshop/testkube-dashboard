import {createApi} from '@reduxjs/toolkit/query/react';

import {TestWithExecution} from '@models/test';
import {TestFilters} from '@models/tests';

import {addIndexes} from '@utils/array';
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
      query: id => `/tests/${id}/executions`,
      transformResponse: (response: any, meta, arg) => {
        const {results, ...rest} = response;

        const indexedResults = addIndexes(results);

        return {results: indexedResults, rest};
      },
    }),
    getTestExecutionById: builder.query<any, string>({
      query: testExecutionId => `/executions/${testExecutionId}`,
    }),
    getTestExecutionArtifacts: builder.query<any, string>({
      query: testExecutionId => `/executions/${testExecutionId}/artifacts`,
    }),
    addTest: builder.mutation<void, any>({
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
} = testsApi;
