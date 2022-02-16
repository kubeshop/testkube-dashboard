import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query({
      query: (filters: any) => `/tests?${paramsSerializer(filters)}`,
    }),
    getTestExecutionsById: builder.query({
      query: testId => `/tests/${testId}/executions`,
    }),
  }),
});

export const {useGetTestsQuery, useGetTestExecutionsByIdQuery} = testsApi;
