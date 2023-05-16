import {createApi} from '@reduxjs/toolkit/query/react';

import {Repository} from '@models/repository';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const repositoryApi = createApi({
  reducerPath: 'repositoryApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    validateRepository: builder.mutation<void, Repository>({
      query: body => ({
        url: '/repositories',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useValidateRepositoryMutation} = repositoryApi;
