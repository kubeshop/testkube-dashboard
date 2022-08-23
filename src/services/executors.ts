import {createApi} from '@reduxjs/toolkit/query/react';

import {Executor} from '@models/executors';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const executorsApi = createApi({
  reducerPath: 'executorsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getExecutors: builder.query<Executor[], null>({
      query: () => '/executors',
    }),
  }),
});

export const {useGetExecutorsQuery} = executorsApi;
