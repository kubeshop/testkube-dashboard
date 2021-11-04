import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@src/constants/config';

const baseUrl = localStorage.getItem(config.apiEndpoint) ?? '';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://demo.testkube.io/results/v1/executions/' }),
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
      query: (filters) => {

        if (filters.date) {
          return `?pageSize=${filters?.pageSize}&page=${filters?.page}&status=${filters?.status}&startDate=${filters?.date}&endDate=${filters?.date}`;
        }

        return `?pageSize=${filters?.pageSize}&page=${filters?.page}&startDate=${filters?.date}&endDate=${filters?.date}`;
      }
    })

  }),
});

// Export hooks for usage in functional components
export const { useGetTestsQuery, useGetTestsByStatusQuery, useGetTestsByDateQuery, useGetTestByIdQuery } = testsApi;
