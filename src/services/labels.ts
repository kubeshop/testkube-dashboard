import {createApi} from '@reduxjs/toolkit/query/react';

import {LabelMap} from '@models/labels';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const labelsApi = createApi({
  reducerPath: 'labelsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getLabels: builder.query<LabelMap, null>({
      query: () => `/labels`,
    }),
  }),
});

export const {useGetLabelsQuery} = labelsApi;
