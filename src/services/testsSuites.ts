import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const testsSuitesApi = createApi({
  reducerPath: 'testsSuitesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTestsSuites: builder.query({
      query: (filters: any) => `/test-suites?${paramsSerializer(filters)}`,
    }),
  }),
});

export const {useGetTestsSuitesQuery} = testsSuitesApi;
