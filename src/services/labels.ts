import {createApi} from '@reduxjs/toolkit/query/react';

import {EntityMap} from '@models/entityMap';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const labelsApi = createApi({
  reducerPath: 'labelsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getLabels: builder.query<EntityMap, null>({
      query: () => `/labels`,
    }),
  }),
});

export const {useGetLabelsQuery} = labelsApi;
