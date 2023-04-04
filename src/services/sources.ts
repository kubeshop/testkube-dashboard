import {createApi} from '@reduxjs/toolkit/query/react';

import {CustomSource} from '@models';

import {dynamicBaseQuery} from '@utils/fetchUtils';

type AddSourcesPayload = {
  batch: CustomSource[];
};

export const sourcesApi = createApi({
  reducerPath: 'sourcesApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getSources: builder.query<CustomSource[], null>({
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
    createSource: builder.mutation<any, CustomSource>({
      query: body => {
        return {
          url: '/test-sources',
          method: 'POST',
          body,
        };
      },
    }),
    getSourceDetails: builder.query<CustomSource, string>({
      query: id => `/test-sources/${id}`,
    }),
    deleteSource: builder.mutation<void, any>({
      query: id => ({
        url: `/test-sources/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSource: builder.mutation<any, CustomSource>({
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

export const {
  useGetSourcesQuery,
  useAddSourcesMutation,
  useGetSourceDetailsQuery,
  useCreateSourceMutation,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} = sourcesApi;
