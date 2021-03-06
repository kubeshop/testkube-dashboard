import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const labelsApi = createApi({
  reducerPath: 'labelsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getLabels: builder.query<any[], null>({
      query: () => `/labels`,
      transformResponse: (response: any) => {
        return response.app;
      },
    }),
  }),
});

export const {useGetLabelsQuery} = labelsApi;
