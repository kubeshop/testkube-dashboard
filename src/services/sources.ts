import {createApi} from '@reduxjs/toolkit/query/react';

import {SourceWithRepository} from '@models/sources';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const sourcesApi = createApi({
  reducerPath: 'sourcesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSources: builder.query<SourceWithRepository[], null>({
      query: () => '/test-sources',
    }),
    addTest: builder.mutation<void, any>({
      query: ({headers = {}, ...rest}) => {
        return {
          url: '/test-sources',
          method: 'POST',
          body: rest,
          headers,
        };
      },
    }),
  }),
});

export const {useGetSourcesQuery, useAddTestMutation} = sourcesApi;
