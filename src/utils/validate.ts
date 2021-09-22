import {config} from '@constants/config';

export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(url);
};

export const getQueryStringFromUrl = (url: string) => {

  const params = new URL(url).searchParams;
  return params.get(config.apiEndpoint);
};

export const removeSpaceFromString = (url: string) => {
  return url.replace(/\s/g, '');
};

export const matchEndpointProtocolWithHostProtocol = (url: string) => {
  const hostProtocol = window.location.protocol;
  if (!url) {
    alert("Invalid URL, You are trying to manipulate the url, please provide a correct url endpoint");
  }

  if (!validateUrl(url)) {
    return;
  }

  const apiEndpointProtocol = new URL(url).protocol;

  if (!apiEndpointProtocol) {
    const newApiEndpointWithProtocol  = `${hostProtocol}//${url}`;
     const cleanURL = removeSpaceFromString(newApiEndpointWithProtocol);
     localStorage.setItem(config.apiEndpoint, cleanURL);
  }

  if (hostProtocol !== apiEndpointProtocol) {
    const matchedUrlProtocol = url.replace(apiEndpointProtocol, hostProtocol);
    const cleanURL = removeSpaceFromString(matchedUrlProtocol);
    localStorage.setItem(config.apiEndpoint, cleanURL);
    return;
  }

  localStorage.setItem(config.apiEndpoint, url);
};

export const removeDuplicatesInQueryString = (originLocation: string) => {

  const queryString = getQueryStringFromUrl(originLocation);
  if (!queryString) {
    return;
  }

  const queryStringArray = queryString.split('apiEndpoint=');

  const uniqueQueryStringArray = [...new Set(queryStringArray)];

  const uniqueQueryString = uniqueQueryStringArray.join('&');

  // window.location.replace(`${window.location.origin}/?apiEndpoint=${uniqueQueryString}`);

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
