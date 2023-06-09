import {useMemo, useRef} from 'react';

import {BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {isEqual} from 'lodash';

import {getApiEndpoint} from '@services/apiEndpoint';

const prohibitedValues = ['undefined', 'null'];

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

type BaseUrlResolver = (routeToRequest: string | undefined) => string;
let resolveBaseUrl: BaseUrlResolver = () => '';
export const setRtkIdTokenResolver = (resolver: IdTokenResolver): void => {
  resolveIdToken = resolver;
};
export const setRtkBaseUrlResolver = (resolver: BaseUrlResolver): void => {
  resolveBaseUrl = resolver;
};

// TODO: Delete these when not needed.
//       It's temporarily used to unify ID token and base url strategy.
export const getRtkBaseUrl = (routeToRequest: string | undefined): string => {
  return resolveBaseUrl(routeToRequest) || '';
};
export const getRtkIdToken = (): Promise<string | null> => {
  return resolveIdToken();
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

export type DynamicFetchArgs = FetchArgs & {routeToRequest?: string};
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
  const baseUrl = resolveBaseUrl(args.routeToRequest) || '';

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

// Keep the same identity for 'data',
// when the actual data is the same.
export function memoizeQuery<T extends UseQuery<any>>(
  hook: T,
  transformData = (x: ReturnType<T>['data']) => x
): ReturnType<T>['data'] {
  return ((...args: Parameters<T>) => {
    type U = ReturnType<T>['data'];
    const result = (hook as any)(...args);

    const dataRef = useRef<U>(result.data);
    const transformedRef = useRef<U>(result.data);

    useMemo(() => {
      if (dataRef.current !== result.data) {
        const next = result.data == null ? result.data : transformData(result.data);
        if (!isEqual(next, transformedRef.current)) {
          transformedRef.current = next;
        }
      }
    }, [result.data]);

    return {...result, data: transformedRef.current};
  }) as any;
}
