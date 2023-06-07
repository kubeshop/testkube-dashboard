import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

export type Entity = 'test-suites' | 'tests';

export type ReduxSlices = 'testSuites' | 'tests' | 'executions' | 'labels' | 'config';

export type EntityListBlueprint = {
  route?: string;

  pageTitle: string;

  pageDescription?: any;

  /**
   * Redux entity which reflects the provided dashboard entity
   */

  reduxSliceName?: ReduxSlices;

  entity: Entity;

  emptyDataComponent: any;

  initialFiltersState: any;

  /**
   * Hook to get data using RTK approach.
   */

  useGetMetrics?: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useAbortAllExecutions?: UseMutation<MutationDefinition<any, any, any, any, any>>;

  /**
   * RTK action to set data fetched from Backend to the Redux store
   */

  setData?: any;

  /**
   * Select for getting data from the Redux store
   */

  selectData?: any;

  /**
   * RTK action to set query filters to the Redux store
   */

  setQueryFilters?: any;

  /**
   * Select for getting query filters from the Redux store
   */

  selectQueryFilters?: any;

  selectAllFilters?: any;

  addEntityButtonText?: string;

  dataTestID?: string;

  data: TestSuiteWithExecution[] | TestWithExecution[];
  isLoading: boolean;
  isFetching: boolean;
};
