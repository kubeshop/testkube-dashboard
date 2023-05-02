import {createApi} from '@reduxjs/toolkit/query/react';

import {ClusterConfig} from '@models/config';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getClusterConfig: builder.query<ClusterConfig, void>({
      query: () => ({
        url: `/config`,
      }),
    }),
  }),
});

// Apply optimization
configApi.useGetClusterConfigQuery = memoizeQuery(configApi.useGetClusterConfigQuery);

export const {useGetClusterConfigQuery} = configApi;
