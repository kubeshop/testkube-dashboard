import {SearchParamsTypes} from '@models/searchParams';

/**
 * This entity is being used to validate the search query
 * params when the user updates the page so we pass
 * to the Redux store only known fields
 */

export const searchParamsLists: SearchParamsTypes = {
  'test-suites': ['textSearch', 'selector', 'status'],
  tests: ['textSearch', 'type', 'createdAt', 'selector', 'status'],
};
