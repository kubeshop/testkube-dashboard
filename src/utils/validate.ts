import {config} from '@constants/config';

import {RemoveLastTrailingSlashFromString, removeSpaceFromString} from './strings';

export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  return pattern.test(url);
};

export const checkIfQueryParamsExistsInUrl = (queryParams: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(queryParams);

  if (!myParam) {
    localStorage.removeItem(config.apiEndpoint);
    return;
  }

  return myParam;
};

export const isHostProtocolSecure = () => {
  return window.location.protocol === 'https:';
};

export const checkApiEndpointProtocol = (apiEndpoint: string) => {
  return apiEndpoint.includes('http') ? apiEndpoint : `${window.location.protocol}//${apiEndpoint}`;
};

export const AppendApiVersionToEndpoint = (apiEndpoint: string) => {
  return `${apiEndpoint}${config.apiVersion}`;
};

export const FinalizedApiEndpoint = (apiEndpoint: string, storeData?: boolean) => {
  const ApiEndpointWithoutSpace = removeSpaceFromString(apiEndpoint);
  const ApiEndpointWithoutTrailingSlash = RemoveLastTrailingSlashFromString(ApiEndpointWithoutSpace);
  const ApiEndpointWithProtocol = checkApiEndpointProtocol(ApiEndpointWithoutTrailingSlash);
  const ApiEndpointWithVersion = AppendApiVersionToEndpoint(ApiEndpointWithProtocol);

  return ApiEndpointWithVersion;
};

export const getQueryStringFromUrl = (url: string) => {
  const params = new URL(url).searchParams;

  return params.get(config.apiEndpoint);
};

export const getApiEndpointOnPageLoad = () => {
  const url = window.location.href;
  const queryString = getQueryStringFromUrl(url);

  if (!queryString) {
    localStorage.removeItem(config.apiEndpoint);
    return;
  }
  const finalUrl = FinalizedApiEndpoint(queryString, true);

  if (!finalUrl) {
    return;
  }
  localStorage.setItem(config.apiEndpoint, finalUrl);
};

export const validateDuplicateValueByKey = (value: string, list: any[], key: string) => {
  let duplicateFlag = false;
  // eslint-disable-next-line no-restricted-syntax
  for (let i in list) {
    if (value === list[i][key] && Boolean(value)) {
      if (duplicateFlag) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return true;
      }
      duplicateFlag = true;
    }
  }
  return false;
};
