import {config} from '@constants/config';

export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    '(https?://)?(?:w{1,3}.)?[^s.]+(?:.[a-z]+)*(?::d+)?((?:/w+)|(?:-w+))*/?(?![^<]*(?:</w+>|/?>))',
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
  const apiEndpointProtocol = url.substring(0, url.indexOf('http') || url.indexOf('https')) || '';

  if (!url) {
    alert('Invalid URL, You are trying to manipulate the url, please provide a correct url endpoint');
  }

  if (!validateUrl(url)) {
    return;
  }

  if (!apiEndpointProtocol) {
    console.log('NOT FOUND');
    const trimmedUrl = removeSpaceFromString(url);
    const cleanUrl = RemoveLastTrailingSlashFromString(trimmedUrl);
    const finalUrl = `${cleanUrl}${config.apiVersion}`;

    localStorage.setItem(config.apiEndpoint, finalUrl);
  }

  if (apiEndpointProtocol) {
    if (apiEndpointProtocol !== hostProtocol) {
      console.log('different', apiEndpointProtocol, hostProtocol);

    } else {
      console.log('same', apiEndpointProtocol, hostProtocol);
    }
  }

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
