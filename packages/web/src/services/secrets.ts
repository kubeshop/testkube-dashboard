import {createApi} from '@reduxjs/toolkit/query/react';

import {ApiSecret, Secret} from '@models/secretRef';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export const secretsApi = createApi({
  reducerPath: 'secretsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getClusterSecrets: builder.query<Secret[], void>({
      query: () => ({
        url: `/secrets`,
      }),
      transformResponse: (res: ApiSecret[]): Secret[] =>
        res.flatMap(secret => secret.keys.map(key => ({key, name: secret.name}))),
    }),
  }),
});

// Apply optimization
secretsApi.useGetClusterSecretsQuery = memoizeQuery(secretsApi.useGetClusterSecretsQuery);

export const {useGetClusterSecretsQuery} = secretsApi;
