import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTests: builder.query({
      query: (filters: any) => {
        return `${filters.scriptName ? `/scripts/${filters.scriptName}` : ''}/executions?${paramsSerializer(filters)}`;
      },
    }),
    getTestById: builder.query<any, any>({
      query: testId => `/executions/${testId}`,
    }),
    getArtifacts: builder.query<any, any>({
      query: testId => `/executions/${testId}/artifacts`,
      // query: (testId) => `618e5291d88b39735423e0c6/artifacts`
    }),
  }),
});

export const {useGetTestsQuery, useGetTestByIdQuery, useGetArtifactsQuery} = testsApi;
