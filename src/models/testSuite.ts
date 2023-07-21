import {EntityMap} from '@models/entityMap';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {Execution} from './execution';
import {Variables} from './variable';

export interface TestSuiteStep {
  delay?: string;
  test?: string;
  namespace?: string;
}

export interface LocalStep extends TestSuiteStep {
  type?: string;
  id: string;
}
export interface TestSuiteBatchStep {
  stopOnFailure: boolean;
  execute: TestSuiteStep[];
}

export type TestSuiteStepExecutionResult = {
  step: TestSuiteBatchStep;
  execute: {
    execution: Execution;
    step: TestSuiteStep;
  }[];
};

export type TestSuite = {
  name: string;
  namespace?: string;
  description?: string;
  before?: TestSuiteBatchStep[];
  steps?: TestSuiteBatchStep[];
  after?: TestSuiteBatchStep[];
  labels?: EntityMap;
  schedule?: string;
  repeats?: number;
  params?: EntityMap;
  created: string;
  variables: Variables;
};

export type TestSuiteWithExecution = {
  testSuite: TestSuite;
  latestExecution?: TestSuiteExecution;
};

export type TestSuiteWithExecutionRedux = {
  dataItem: TestSuite;
  latestExecution?: TestSuiteExecution;
};

export type TestSuiteFilters = {
  textSearch: string;
  pageSize: number;
  page: number;
  selector: string[];
  startDate: null;
  endDate: null;
  status: Array<string>;
};

interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuiteWithExecutionRedux[];
  latestExecution?: Execution;
  filters: TestSuiteFilters;
  totals: {};
  filtered: {};
}

export type {TestSuitesState};
