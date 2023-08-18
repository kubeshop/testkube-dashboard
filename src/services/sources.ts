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
  tagTypes: ['Source'],
  endpoints: builder => ({
    getSources: builder.query<SourceWithRepository[], null>({
      query: () => ({
        url: '/test-sources',
      }),
      providesTags: [{type: 'Source', id: 'LIST'}],
    }),
    addSources: builder.mutation<any, AddSourcesPayload>({
      query: body => ({
        url: '/test-sources',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{type: 'Source', id: 'LIST'}],
    }),
    createSource: builder.mutation<CreateSourceResult, SourceWithRepository>({
      query: body => ({
        url: '/test-sources',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Source', id: 'LIST'}],
    }),
    getSourceDefinition: builder.query<string, string>({
      query: id => ({
        url: `/test-sources/${id}`,
        responseHandler: 'text',
        headers: {accept: 'text/yaml'},
      }),
      providesTags: (res, err, id) => [{type: 'Source', id}],
    }),
    getSourceDetails: builder.query<SourceWithRepository, string>({
      query: id => ({
        url: `/test-sources/${id}`,
      }),
      providesTags: (res, err, id) => [{type: 'Source', id}],
    }),
    deleteSource: builder.mutation<void, string>({
      query: id => ({
        url: `/test-sources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, id) => [
        {type: 'Source', id: 'LIST'},
        {type: 'Source', id},
      ],
    }),
    updateSource: builder.mutation<any, SourceWithRepository>({
      query: body => ({
        url: `/test-sources/${body.name}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Source', id: 'LIST'},
        {type: 'Source', id},
      ],
    }),
    updateSourceDefinition: builder.mutation<any, YamlEditBody>({
      query: body => ({
        url: `/test-sources/${body.name}`,
        method: 'PATCH',
        headers: {'content-type': 'text/yaml'},
        body: body.value,
      }),
      invalidatesTags: (res, err, {name: id}) => [
        {type: 'Source', id: 'LIST'},
        {type: 'Source', id},
      ],
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
