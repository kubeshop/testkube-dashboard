export type SearchParamKey =
  | 'textSearch'
  | 'selector'
  | 'startDate'
  | 'endDate'
  | 'pageSize'
  | 'status'
  | 'page'
  | 'testName'
  | 'createdAt'
  | 'type';

export type SearchParamValue = any;

export type SearchParamsType = 'test-suites' | 'tests';

export type SearchParamsKeys = SearchParamKey[];

export type SearchParamsTypes = {
  [key in SearchParamsType]: SearchParamsKeys;
};

export type ValidatedSearchParams = {
  [key in SearchParamKey]: SearchParamValue;
};

export enum SearchParams {
  'test-suites' = 'test-suites',
  tests = 'tests',
}
