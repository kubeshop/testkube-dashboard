import {SearchParamsTypes} from '@models/searchParams';

export const searchParamsLists: SearchParamsTypes = {
  tests: ['textSearch'],
  scripts: ['textSearch'],
  'test-executions': [],
  executions: ['scriptName', 'status', 'page', 'pageSize', 'startDate', 'endDate'],
};
