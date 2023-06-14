import {FC} from 'react';

import {ModalConfig} from '@contexts/ModalContext';

import {TestWithExecutionRedux} from '@models/test';
import {TestSuiteWithExecutionRedux} from '@models/testSuite';

import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

export type Entity = 'test-suites' | 'tests';

export type EntityListBlueprint = {
  pageTitle: string;

  pageDescription?: any;

  entity: Entity;

  emptyDataComponent: any;

  initialFiltersState: any;

  // TODO: Fix types
  CardComponent: FC<{item: any; onClick: (item: Item) => void; onAbort: (item: Item) => void}>;

  /**
   * RTK action to set data fetched from Backend to the Redux store
   */

  setData?: any;

  /**
   * RTK action to set query filters to the Redux store
   */

  setQueryFilters?: any;

  addEntityButtonText?: string;

  dataTest?: string;

  queryFilters: any;
  data?: TestSuiteWithExecutionRedux[] | TestWithExecutionRedux[];

  createModalConfig: ModalConfig;

  isLoading: boolean;
  isFetching: boolean;

  onItemClick: (item: any) => void;
  onItemAbort: (item: any) => void;
};
