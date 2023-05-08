import {EntityMap} from '@models/entityMap';
import {ObjectRef} from '@models/objectRef';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {Execution} from './execution';
import {Variables} from './variable';

export type TestSuiteStepDelay = {
  duration: number;
};

export type TestSuiteStepExecuteTest = {
  namespace?: string;
  name: string;
  type: string;
};

export interface TestSuiteStepAbstract {
  stopTestOnFailure: boolean;
  // Used for form
  id?: string | number;
}

export interface TestSuiteStepWithExecute extends TestSuiteStepAbstract {
  execute: TestSuiteStepExecuteTest;
}

export interface TestSuiteStepWithDelay extends TestSuiteStepAbstract {
  delay: TestSuiteStepDelay;
}

export type TestSuiteStep = TestSuiteStepWithExecute | TestSuiteStepWithDelay;

export type TestSuiteStepExecutionResult = {
  description?: string;
  step: TestSuiteStep;
  test: ObjectRef;
  execution: Execution;
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

export type TestSuiteForTrigger = {
  name: TestSuite['name'];
  namespace: TestSuite['namespace'];
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
