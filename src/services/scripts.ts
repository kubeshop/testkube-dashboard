import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery, paramsSerializer} from '@utils/fetchUtils';

export const scriptsApi = createApi({
  reducerPath: 'scriptsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getScripts: builder.query({
      query: (filters: any) => `/scripts?${paramsSerializer(filters)}`,
    }),
    getScriptExecutionsById: builder.query({
      query: scriptId => `/scripts/${scriptId}/executions`,
    }),
  }),
});

export const {useGetScriptsQuery, useGetScriptExecutionsByIdQuery} = scriptsApi;
