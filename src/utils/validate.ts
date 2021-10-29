import {config} from '@constants/config';
import { removeSpaceFromString, RemoveLastTrailingSlashFromString } from './strings';

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

export const CheckIfQueryParamsExistsInUrl = (queryParams: string) => {
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

  if (storeData) {
    localStorage.setItem(config.apiEndpoint, ApiEndpointWithVersion);
    return;
  }

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
