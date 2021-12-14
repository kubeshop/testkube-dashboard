import {BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery} from '@reduxjs/toolkit/dist/query';

import {ParsedQuery} from 'query-string';

import {config} from '@constants/config';
import {searchParamsLists} from '@constants/searchParams';

import {SearchParamsKeys, SearchParamsType, ValidatedSearchParams} from '@models/searchParams';

const prohibitedValues = ['undefined', 'null'];

/**
 * Returns a valid object to Redux store by filtering unknown fields of the given params
 *
 * TODO: finish queryparams purifying
 */
export const validateSearchParams = (params: ParsedQuery, paramsType: SearchParamsType): ValidatedSearchParams => {
  const possibleSearchParams: SearchParamsKeys = searchParamsLists[paramsType];
  const unidentifiedSearchParams: SearchParamsKeys = [];

  const paramsList = Object.entries(params);

  paramsList.map(([paramKey, paramValue]) => {
    if (!possibleSearchParams.includes(paramKey)) {
      unidentifiedSearchParams.push(paramKey);
    }

    return [paramKey, paramValue];
  });

  const validatedParamsList = paramsList.filter(([paramKey]) => {
    return !unidentifiedSearchParams.includes(paramKey);
  });

  // TODO: finish queryparams purifying
  // purifyQueryParams(unidentifiedSearchParams);

  return Object.fromEntries(validatedParamsList);
};

export const paramsSerializer = (params: object) => {
  return Object.entries(params)
    .map(([key, value]: any) => {
      return (value || value === 0) && !prohibitedValues.includes(value)
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : '';
    })
    .filter(item => {
      return item !== '';
    })

    .join('&');
};

const rawBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
  });

export const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
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

// TODO: finish queryparams purifying
const purifyQueryParams = (paramsToRemove: SearchParamsKeys) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);

  // eslint-disable-next-line no-restricted-syntax
  for (let i of params.keys()) {
    if (paramsToRemove.includes(i)) {
      params.delete(i);
    }
  }
};
