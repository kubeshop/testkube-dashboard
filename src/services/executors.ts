import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const executorsApi = createApi({
  reducerPath: 'executorsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getExecutors: builder.query<any[], null>({
      query: () => `/executors`,
    }),
  }),
});

export const {useGetExecutorsQuery} = executorsApi;
