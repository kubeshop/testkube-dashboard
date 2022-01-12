import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testExecutionsApi = createApi({
  reducerPath: 'testExecutionsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestExecutionsByTestId: builder.query({
      query: (filters: any) => `/tests?${paramsSerializer(filters)}`,
    }),
  }),
});

export const {useGetTestExecutionsByTestIdQuery} = testExecutionsApi;
