import {FilterType} from '@models/filters';

export const executionDateFormat = 'MMM d, p';

export const githubUriRegex = /.+\.git$/;

export const truncateText = (text: string) => {
  if (text.length > 10) {
    return `${text.substring(0, 10)}...`;
  }
  return text;
};

export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const findMatchWordInString = (word: string, string: string) => {
  return string.match(new RegExp(word, 'gi'));
};

export const removeSpaceFromString = (url: string) => {
  return url.replace(/\s/g, '');
};

export const RemoveLastTrailingSlashFromString = (word: string) => {
  return word.replace(/\/$/, '');
};

export const getLastStringAfterTrailingSlash = (word: string) => {
  return word.substring(word.lastIndexOf('/') + 1);
};

export const hasProtocol = (url: string) => {
  return /^http(s)?:\/\/.*/.test(url);
};

const arraylikeQueryParams: {[key in FilterType | string]: boolean} = {
  selector: true,
  status: false,
  dateRange: false,
  textSearch: false,
};

export const isArraylikeQueryParam = (paramKey: FilterType | string) => {
  return arraylikeQueryParams[paramKey];
};

export const uppercaseFirstSymbol = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};
