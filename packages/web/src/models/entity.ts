import {FC, ReactNode} from 'react';

import {TestFilters, TestWithExecution} from '@models/test';
import {TestSuiteFilters, TestSuiteWithExecution} from '@models/testSuite';

import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

export type Entity = 'test-suites' | 'tests';

export interface EntityViewBlueprint {
  CardComponent: FC<{item: any; onClick: (item: Item) => void}>;
  data: TestSuiteWithExecution[] | TestWithExecution[] | undefined;
  emptyDataComponent: FC<{action: () => void; isClusterAvailable?: boolean}>;
  entity: Entity;
  initialFiltersState: TestFilters | TestSuiteFilters;
  isFetching: boolean;
  isListLoading: boolean;
  isLoading: boolean;
  itemKey: string;
  pageTitle: string;
  queryFilters: TestFilters | TestSuiteFilters;
  addEntityButtonText?: string;
  dataTest?: string;
  pageDescription?: ReactNode;
  pageTitleAddon?: ReactNode;
  onAdd: () => void;
  onItemClick: (item: any) => void;

  /**
   * RTK action to set query filters to the Redux store
   */

  setQueryFilters: any;
}

export interface EntityFilters {
  setFilters: (filters: TestFilters | TestSuiteFilters) => void;
  filters: TestFilters | TestSuiteFilters;
  disabled: boolean;
  width?: string;
}
