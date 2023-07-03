import {createApi} from '@reduxjs/toolkit/query/react';

import {YamlEditBody} from '@models/fetch';
import {Repository} from '@models/repository';
import {CreateSourceResult, SourceWithRepository} from '@models/sources';

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
    createSource: builder.mutation<CreateSourceResult, SourceWithRepository>({
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
    updateSource: builder.mutation<any, SourceWithRepository>({
      query: body => {
        return {
          url: `/test-sources/${body.name}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    updateSourceDefinition: builder.mutation<any, YamlEditBody>({
      query: body => {
        return {
          url: `/test-sources/${body.name}`,
          method: 'PATCH',
          headers: {'Content-Type': 'text/yaml'},
          body: body.value,
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
  useUpdateSourceDefinitionMutation,
} = sourcesApi;
