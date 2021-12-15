export type SearchParamKey = string;

export type SearchParamValue = any

export type SearchParamsType = 'tests' | 'scripts' | 'executions' | 'test-executions';

export type SearchParamsKeys = SearchParamKey[];

export type SearchParamsTypes = {
  [key in SearchParamsType]: SearchParamsKeys;
};

export type ValidatedSearchParams = {[key: SearchParamKey]: SearchParamValue};

export enum SearchParams {
  tests = 'tests',
  scripts = 'scripts',
  'test-executions' = 'test-executions',
  executions = 'executions',
}
