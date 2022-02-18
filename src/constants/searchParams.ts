import {SearchParamsTypes} from '@models/searchParams';

/**
 * This entity is being used to validate the search query
 * params when the user updates the page so we pass
 * to the Redux store only known fields
 */

export const searchParamsLists: SearchParamsTypes = {
  'test-suites': ['textSearch', 'tags'],
  tests: ['textSearch', 'type', 'tags', 'createdAt'],
  'test-executions': ['textSearch', 'page', 'pageSize', 'tags'],
  'test-suite-executions': ['textSearch', 'page', 'pageSize', 'tags'],
  executions: ['testName', 'type', 'status', 'page', 'pageSize', 'startDate', 'endDate', 'tags'],
};
