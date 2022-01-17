import {SearchParamsTypes} from '@models/searchParams';

export const searchParamsLists: SearchParamsTypes = {
  tests: ['textSearch'],
  scripts: ['textSearch'],
  'test-executions': ['textSearch', 'page', 'pageSize'],
  executions: ['scriptName', 'status', 'page', 'pageSize', 'startDate', 'endDate'],
};
