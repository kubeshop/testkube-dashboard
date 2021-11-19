import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { config } from '@src/constants/config';
import moment from 'moment';

const rawBaseQuery = (baseUrl: string) => fetchBaseQuery({
  baseUrl
});

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseUrl = localStorage.getItem(config.apiEndpoint);
    if (!baseUrl) {
      return {
        error: {
          status: 400,
          statusText: 'Bad Request',
          data: 'No Host found',
        },
      };
    }

    return rawBaseQuery(baseUrl)(args, api, extraOptions);
  };

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getTests: builder.query({
      query: (filters) => `?pageSize=${filters?.pageSize}&page=${filters?.page}`
    }),
    getTestsByStatus: builder.query<any, any>({
      query: (filters) => `?pageSize=${filters?.pageSize}&page=${filters?.page}&status=${filters?.status}`,
    }),
    getTestById: builder.query<any, any>({
      query: (testId) => `${testId}`,
    }),
    getTestsByDate: builder.query<any, any>({
      query: (filters) => `?pageSize=${filters?.pageSize}&page=${filters?.page}&startDate=${moment(filters?.date[0]).format('YYYY-MM-DD')}&endDate=${moment(filters?.date[1]).format('YYYY-MM-DD')}`
    }),
    getArtifacts: builder.query<any, any>({
      query: (testId) => `${testId}/artifacts`
      // query: (testId) => `618e5291d88b39735423e0c6/artifacts`
    })

  }),
});

export const { useGetTestsQuery, useGetTestsByStatusQuery, useGetTestsByDateQuery, useGetTestByIdQuery, useGetArtifactsQuery } = testsApi;
