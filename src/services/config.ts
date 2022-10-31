import {createApi} from '@reduxjs/toolkit/query/react';

import {ClusterConfig} from '@models/config';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getClusterConfig: builder.query<ClusterConfig, void>({
      query: () => '/config',
    }),
  }),
});

export const {useGetClusterConfigQuery} = configApi;
