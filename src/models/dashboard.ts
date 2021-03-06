import {QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {FilterType} from './filters';

export type DashboardBlueprintType = 'test-suites' | 'tests';

export type DashboardEmptyDrawerEntity = 'test' | 'test suite';

export type DashboardReduxEntities =
  | 'testSuites'
  | 'testSuiteExecutions'
  | 'tests'
  | 'executions'
  | 'labels'
  | 'config';

export type DashboardBlueprintProps = {
  entityType: DashboardBlueprintType;
};

/**
 * Generic type of dashboard pages
 */

export type DashboardBlueprint = {
  /**
   * Route to the dashboard entity
   */

  route?: string;
  dashboardGradient?: string;
  emptyDrawerEntity?: DashboardEmptyDrawerEntity;

  /**
   * Page title e.g. 'Test Suites'
   */

  pageTitle: string;

  /**
   * Redux entity which reflects the provided dashboard entity
   */

  reduxEntity?: DashboardReduxEntities;

  /**
   * Name of a data list in the Redux store
   */

  reduxListName: string;

  /**
   * Dashboard entity type
   */

  entityType: DashboardBlueprintType;

  /**
   * Whether to show InfoPanel component to the right
   */

  hasInfoPanel: boolean;

  /**
   * Whether the user can click on table row
   */

  canSelectRow: boolean;

  filtersComponentsIds?: FilterType[];

  /**
   * Hook to get data using RTK approach.
   */

  useGetData?: UseQuery<QueryDefinition<any, any, any, any, any>>;

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

  /**
   * RTK action to set selected record to the Redux store
   */

  setSelectedRecord?: any;

  /**
   * Select for getting selected record from the Redux store
   */

  selectSelectedRecord?: any;

  /**
   * The name of the field which reflects the unique identificator fetched from the Backend
   */

  selectedRecordIdFieldName?: string;

  /**
   * The name of the field which reflects the test type fetched from the Backend
   */

  testTypeFieldName?: string;
};
