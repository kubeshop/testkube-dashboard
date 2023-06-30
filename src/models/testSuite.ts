import {EntityMap} from '@models/entityMap';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {Execution} from './execution';
import {Variables} from './variable';

export interface AdditionalStepFields extends TestSuiteExecuteStep {
  stopTestOnFailure?: boolean;
  id?: string;
}

export interface TestSuiteExecuteStep {
  delay?: string;
  test?: string;
}
export interface TestSuiteStep {
  stopTestOnFailure: boolean;
  execute: TestSuiteExecuteStep[];
}

export interface LocalStep extends AdditionalStepFields {
  type?: string;
}

export type LocalStepsList = LocalStep[];

export type TestSuiteStepExecutionResult = {
  step: TestSuiteStep;
  execute: {
    execution: Execution;
    step: TestSuiteExecuteStep;
  }[];
};

export type TestSuite = {
  name: string;
  namespace?: string;
  description?: string;
  before?: TestSuiteStep[];
  steps?: TestSuiteStep[];
  after?: TestSuiteStep[];
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
