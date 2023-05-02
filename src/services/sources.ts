import {createApi} from '@reduxjs/toolkit/query/react';

import {Repository} from '@models/repository';
import {CreateSourcePayload, SourceWithRepository} from '@models/sources';

import {dynamicBaseQuery, memoizeQuery} from '@utils/fetchUtils';

export type SourceFormField = {name: string; type: 'git-dir'; repository: Repository};

type AddSourcesPayload = {
  batch: SourceFormField[];
};

export const sourcesApi = createApi({
  reducerPath: 'sourcesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSources: builder.query<SourceWithRepository[], null>({
      query: () => ({
        url: '/test-sources',
      }),
    }),
    addSources: builder.mutation<any, AddSourcesPayload>({
      query: body => ({
        url: '/test-sources',
        method: 'PATCH',
        body,
      }),
    }),
    createSource: builder.mutation<CreateSourcePayload, SourceWithRepository>({
      query: body => ({
        url: '/test-sources',
        method: 'POST',
        body,
      }),
    }),
    getSourceDefinition: builder.query<string, string>({
      query: id => ({
        url: `/test-sources/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
    }),
    getSourceDetails: builder.query<SourceWithRepository, string>({
      query: id => ({
        url: `/test-sources/${id}`,
      }),
    }),
    deleteSource: builder.mutation<void, string>({
      query: id => ({
        url: `/test-sources/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSource: builder.mutation<void, SourceWithRepository>({
      query: body => {
        return {
          url: `/test-sources/${body.name}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

// Apply optimization
sourcesApi.useGetSourcesQuery = memoizeQuery(sourcesApi.useGetSourcesQuery);

export const {
  useGetSourcesQuery,
  useGetSourceDefinitionQuery,
  useGetSourceDetailsQuery,
  useCreateSourceMutation,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} = sourcesApi;
