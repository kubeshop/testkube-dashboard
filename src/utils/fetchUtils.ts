import {BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery} from '@reduxjs/toolkit/dist/query';

import {ParsedQuery} from 'query-string';

import {searchParamsLists} from '@constants/searchParams';

import {SearchParamKey, SearchParamsKeys, SearchParamsType, ValidatedSearchParams} from '@models/searchParams';

import {isArraylikeQueryParam} from '@utils/strings';

import {getApiEndpoint} from '@services/apiEndpoint';

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
    .map(([key, value]: [string, any]) => {
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

type IdTokenResolver = () => Promise<string | null>;
let resolveIdToken: IdTokenResolver = () => Promise.resolve(null);

type BaseUrlResolver = (routeToRequest: string | null) => string;
let resolveBaseUrl: BaseUrlResolver = () => '';
export const setRtkIdTokenResolver = (resolver: IdTokenResolver): void => {
  resolveIdToken = resolver;
};
export const setRtkBaseUrlResolver = (resolver: BaseUrlResolver): void => {
  resolveBaseUrl = resolver;
};

const rawBaseQuery = (baseUrl: string, idToken?: string | null) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      if (idToken) {
        const bearer = `Bearer ${idToken}`;
        headers.append('Authorization', bearer);
      }

      return headers;
    },
  });

type DynamicFetchArgs = FetchArgs & {routeToRequest?: string};
export const dynamicBaseQuery: BaseQueryFn<string | DynamicFetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const apiEndpoint = getApiEndpoint();
  if (!apiEndpoint) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No Host found',
      },
    };
  }

  if (typeof args === 'string') {
    args = {url: args};
  }

  const idToken = await resolveIdToken();
  const baseUrl = resolveBaseUrl(args.routeToRequest || null) || '';

  return rawBaseQuery(`${apiEndpoint}${baseUrl}`, idToken)(args, api, extraOptions);
};

export async function safeRefetch<T>(refetchFn: () => Promise<T>): Promise<T | null> {
  try {
    return await refetchFn();
  } catch (err: any) {
    if (!err?.message.includes('not been started yet')) {
      throw err;
    }
  }
  return null;
}
