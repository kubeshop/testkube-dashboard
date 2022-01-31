/* eslint-disable unused-imports/no-unused-imports-ts */
import {BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery} from '@reduxjs/toolkit/dist/query';

import {ParsedQuery} from 'query-string';

import {config} from '@constants/config';
import {searchParamsLists} from '@constants/searchParams';

import {SearchParamKey, SearchParamsKeys, SearchParamsType, ValidatedSearchParams} from '@models/searchParams';

import {isArraylikeQueryParam} from '@utils/strings';

const prohibitedValues = ['undefined', 'null'];

/**
 * Returns a valid object to Redux store by filtering unknown fields of the given params
 *
 * TODO: finish queryparams purifying
 */

export const validateSearchParams = (params: ParsedQuery, paramsType: SearchParamsType): ValidatedSearchParams => {
  const possibleSearchParams: SearchParamsKeys = searchParamsLists[paramsType];
  const unidentifiedSearchParams: string[] = [];

  const paramsList = Object.entries(params);

  const validatedParamsList = paramsList
    .map(([paramKey, paramValue]) => {
      // Negative lookahead: assume that paramKey is not a valid SearchParamKey
      if (!possibleSearchParams.includes(paramKey as SearchParamKey)) {
        unidentifiedSearchParams.push(paramKey);
      }

      const finalParamValue =
        isArraylikeQueryParam(paramKey) && typeof paramValue === 'string' ? paramValue.split(',') : paramValue;

      return [paramKey, finalParamValue];
    })
    .filter(([paramKey]) => {
      return !unidentifiedSearchParams.includes(paramKey as SearchParamKey);
    });

  /**
   * TODO: finish queryparams purifying
   * purifyQueryParams(unidentifiedSearchParams);
   */

  return Object.fromEntries(validatedParamsList);
};

export const paramsSerializer = (params: object) => {
  return Object.entries(params)
    .map(([key, value]: any) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
        }

        return '';
      }

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
const purifyQueryParams = (paramsToRemove: string[]) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);

  // eslint-disable-next-line no-restricted-syntax
  for (let i of params.keys()) {
    if (paramsToRemove.includes(i)) {
      params.delete(i);
    }
  }
};
