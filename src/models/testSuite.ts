import {EntityMap} from '@models/entityMap';
import {ObjectRef} from '@models/objectRef';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {Variable} from './variable';

export type TestSuiteStepTypeEnum = 'executeTest' | 'delay';

export type TestSuiteStepDelay = {
  duration: number;
};

export type TestSuiteStepExecuteTest = {
  namespace?: string;
  name: string;
};

export type TestSuiteStep = {
  stopTestOnFailure: boolean;
  execute?: TestSuiteStepExecuteTest;
  delay?: TestSuiteStepDelay;
};

export type TestSuiteStepExecutionResult = {
  step: TestSuiteStep;
  test: ObjectRef;
  execution: any;
};

export type TestSuite = {
  name: string;
  namespace?: string;
  description?: string;
  before?: TestSuiteStep[];
  steps: TestSuiteStep[];
  after?: TestSuiteStep[];
  labels?: EntityMap;
  schedule?: string;
  repeats?: number;
  params?: EntityMap;
};

export type TestSuiteWithExecution = {
  dataList: TestSuite;
  latestExecution?: TestSuiteExecution;
};
