import {createApi} from '@reduxjs/toolkit/query/react';

import {Source} from '@models/sources';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const sourcesApi = createApi({
  reducerPath: 'sourcesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSources: builder.query<Source[], null>({
      query: () => '/test-sources',
    }),
  }),
});

export const {useGetSourcesQuery} = sourcesApi;
