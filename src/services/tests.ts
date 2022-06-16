import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {config} from '@constants/config';

import {TestWithExecution} from '@models/test';
import {TestFilters} from '@models/tests';

import {addIndexes} from '@utils/array';
import {paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: fetchBaseQuery({baseUrl: localStorage.getItem(config.apiEndpoint) || ''}),
  endpoints: builder => ({
    getTests: builder.query<TestWithExecution[], TestFilters>({
      query: filters => `/test-with-executions?${paramsSerializer(filters)}`,
    }),
    getTestExecutionsById: builder.query({
      query: ({name}) => `/tests/${name}/executions`,
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
    updateTest: builder.mutation<void, any>({
      query: body => ({
        url: `/tests/${body.id}`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionArtifactsQuery,
  useAddTestMutation,
  useUpdateTestMutation,
} = testsApi;
