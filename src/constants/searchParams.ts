import {SearchParamsTypes} from '@models/searchParams';

/**
 * This entity is being used to validate the search query
 * params when the user updates the page so we pass
 * to the Redux store only known fields
 */

export const searchParamsLists: SearchParamsTypes = {
  'test-suites': ['textSearch', 'selector'],
  tests: ['textSearch', 'type', 'selector', 'createdAt'],
  'test-executions': ['textSearch', 'page', 'pageSize', 'selector'],
  'test-suite-executions': ['textSearch', 'page', 'pageSize', 'selector'],
  executions: ['testName', 'type', 'status', 'page', 'pageSize', 'startDate', 'endDate', 'selector'],
};
