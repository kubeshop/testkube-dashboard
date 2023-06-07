import {FC} from 'react';

import {MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

export type Entity = 'test-suites' | 'tests';

export type ReduxSlices = 'testSuites' | 'tests' | 'executions' | 'labels' | 'config';

export type EntityListBlueprint = {
  route?: string;

  pageTitle: string;

  pageDescription?: any;

  entity: Entity;

  emptyDataComponent: any;

  initialFiltersState: any;

  // TODO: Fix types
  CardComponent: FC<{item: any; onClick: (item: Item) => void}>;

  /**
   * Hook to get data using RTK approach.
   */

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

  queryFilters: any;
  dataSource: any;

  data: TestSuiteWithExecution[] | TestWithExecution[];
  isLoading: boolean;
  isFetching: boolean;
};
