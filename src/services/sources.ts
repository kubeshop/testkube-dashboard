import {createApi} from '@reduxjs/toolkit/query/react';

import {Repository} from '@models/repository';
import {SourceWithRepository} from '@models/sources';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export type SourceFormField = {name: string; type: 'git-dir'; repository: Repository};

type AddSourcesPayload = {
  batch: SourceFormField[];
};

export const sourcesApi = createApi({
  reducerPath: 'sourcesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSources: builder.query<SourceWithRepository[], null>({
      query: () => '/test-sources',
    }),
    addSources: builder.mutation<any, AddSourcesPayload>({
      query: body => {
        return {
          url: '/test-sources',
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const {useGetSourcesQuery, useAddSourcesMutation} = sourcesApi;
