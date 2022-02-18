export type SearchParamKey =
  | 'textSearch'
  | 'tags'
  | 'startDate'
  | 'endDate'
  | 'pageSize'
  | 'status'
  | 'page'
  | 'testName'
  | 'createdAt'
  | 'type';

export type SearchParamValue = any;

export type SearchParamsType = 'test-suites' | 'tests' | 'executions' | 'test-executions' | 'test-suite-executions';

export type SearchParamsKeys = SearchParamKey[];

export type SearchParamsTypes = {
  [key in SearchParamsType]: SearchParamsKeys;
};

export type ValidatedSearchParams = {
  [key in SearchParamKey]: SearchParamValue;
};

export enum SearchParams {
  'test-suites' = 'test-suites',
  'test-suite-executions' = 'test-suite-executions',
  tests = 'tests',
  'test-executions' = 'test-executions',
  executions = 'executions',
}
