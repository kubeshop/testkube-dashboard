import {FilterType} from '@models/filters';

export const executionDateFormat = 'MMM d, p';

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
