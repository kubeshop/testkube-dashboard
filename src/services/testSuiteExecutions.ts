import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testSuiteExecutionsApi = createApi({
  reducerPath: 'testSuiteExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestSuiteExecutionsByTestId: builder.query({
      query: (filters: any) => `/test-suite-executions?${paramsSerializer(filters)}`,
    }),
  }),
});

export const {useGetTestSuiteExecutionsByTestIdQuery} = testSuiteExecutionsApi;
