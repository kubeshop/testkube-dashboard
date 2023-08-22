import {Headers} from '@models/fetch';

export const composeHeaders = (headers: {key: string; value: string}[]) => {
  if (!headers) {
    return {} as Headers;
  }

  return headers.reduce((acc, header) => {
    acc[header.key] = header.value;

    return acc;
  }, {} as Headers);
};

export const decomposeHeaders = (headers: Headers) => {
  return Object.entries(headers).map(([key, value]) => {
    return {key, value};
  });
};
