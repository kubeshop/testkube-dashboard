import {createApi} from '@reduxjs/toolkit/query/react';

import {addIndexes} from '@utils/array';
import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query({
      query: (filters: any) => `/test-with-executions?${paramsSerializer(filters)}`,
    }),
    getTestExecutionsById: builder.query({
      query: ({name}) => `/tests/${name}/executions`,
      transformResponse: (response: any, meta, arg) => {
        const {results, ...rest} = response;

        const indexedResults = addIndexes(results);

        return {results: indexedResults, rest};
      },
    }),
    getTestExecutionById: builder.query({
      query: (testExecutionId: string) => `/executions/${testExecutionId}`,
    }),
    getTestExecutionArtifacts: builder.query({
      query: (testExecutionId: string) => `/executions/${testExecutionId}/artifacts`,
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionArtifactsQuery,
} = testsApi;
