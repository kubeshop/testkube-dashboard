import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const repositoryApi = createApi({
  reducerPath: 'repositoryApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    validateRepository: builder.mutation<any, any>({
      query: body => {
        return {
          url: '/repositories',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {useValidateRepositoryMutation} = repositoryApi;
