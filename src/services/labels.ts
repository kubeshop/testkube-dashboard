import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const labelsApi = createApi({
  reducerPath: 'labelsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getLabels: builder.query<{[key: string]: string[]}, null>({
      query: () => `/labels`,
    }),
  }),
});

export const {useGetLabelsQuery} = labelsApi;
