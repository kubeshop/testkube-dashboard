import {createApi} from '@reduxjs/toolkit/query/react';

import {dynamicBaseQuery} from '@utils/fetchUtils';

export const scriptsApi = createApi({
  reducerPath: 'scriptsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getScripts: builder.query({
      query: () => '/scripts',
    }),
  }),
});

export const {useGetScriptsQuery} = scriptsApi;
