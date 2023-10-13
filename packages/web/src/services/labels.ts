import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const labelsApi = createApi({
  reducerPath: 'labelsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getLabels: builder.query<{[key: string]: string[]}, null>({
      query: () => ({
        url: `/labels`,
      }),
    }),
  }),
});

// Apply optimization
labelsApi.useGetLabelsQuery = memoizeQuery(labelsApi.useGetLabelsQuery);

export const {useGetLabelsQuery} = labelsApi;
