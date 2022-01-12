import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getTags: builder.query({
      query: () => `/tags`,
    }),
  }),
});

export const {useGetTagsQuery} = tagsApi;
