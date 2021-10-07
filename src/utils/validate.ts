import {config} from '@constants/config';

export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    'https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?((?:\/\w+)|(?:-\w+))*\/?(?![^<]*(?:<\/\w+>|\/?>))',
    'i'
  );

  return pattern.test(url);
};

export const getQueryStringFromUrl = (url: string) => {
  const params = new URL(url).searchParams;

  return params.get(config.apiEndpoint);
};

export const RemoveLastTrailingSlashFromString = (word: string) => {
  return word.replace(/\/$/, '');
};

export const removeSpaceFromString = (url: string) => {
  return url.replace(/\s/g, '');
};

export const matchEndpointProtocolWithHostProtocol = (url: string) => {
  const hostProtocol = window.location.protocol;

  if (!url) {
    alert('Invalid URL, You are trying to manipulate the url, please provide a correct url endpoint');
  }

  if (!validateUrl(url)) {
    return;
  }

  const apiEndpointProtocol = new URL(url).protocol;

  if (!apiEndpointProtocol) {
    const newApiEndpointWithProtocol = `${hostProtocol}//${url}`;
    const trimmedUrl = removeSpaceFromString(newApiEndpointWithProtocol);
    const cleanUrl = RemoveLastTrailingSlashFromString(trimmedUrl);
    const finalUrl = `${cleanUrl}${config.apiVersion}`;

    localStorage.setItem(config.apiEndpoint, finalUrl);
  }

  if (hostProtocol !== apiEndpointProtocol) {
    const matchedUrlProtocol = url.replace(apiEndpointProtocol, hostProtocol);
    const trimmedUrl = removeSpaceFromString(matchedUrlProtocol);
    const cleanUrl = RemoveLastTrailingSlashFromString(trimmedUrl);
    const finalUrl = `${cleanUrl}${config.apiVersion}`;

    localStorage.setItem(config.apiEndpoint, finalUrl);
    return;
  }

  localStorage.setItem(config.apiEndpoint, url);
};

export const cleanStorageWhenApiEndpointQueryStringIsAbsent = () => {
  const url = window.location.href;
  const apiEndpointQueryString = getQueryStringFromUrl(url);

  if (!apiEndpointQueryString) {
    localStorage.removeItem(config.apiEndpoint);
  }
};

export const getApiEndpointOnPageLoad = () => {
  const url = window.location.href;
  const queryString = getQueryStringFromUrl(url);

  if (!queryString) {
    localStorage.removeItem(config.apiEndpoint);
    return;
  }

  matchEndpointProtocolWithHostProtocol(queryString);
};

export const checkApiEndpointProtocol = (apiEndpoint: string) => {
  return apiEndpoint.includes('http') ? apiEndpoint : `${window.location.protocol}//${apiEndpoint}`;
};

export const findMatchWordInString = (word: string, string: string) => {
  return string.match(new RegExp(word, 'gi'));
};

export const isHostProtocolSecure = () => {
  return window.location.protocol === 'https:';
};

export const CheckIfQueryParamsExistsInUrl = (queryParams: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(queryParams);

  if (!myParam) {
    return;
  }

  return myParam;
};
