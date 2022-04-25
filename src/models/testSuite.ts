import {LabelMap} from '@models/labels';
import {ObjectRef} from '@models/objectRef';
import {ParamMap} from '@models/param';
import {TestSuiteExecution} from '@models/testSuiteExecution';

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
  labels?: LabelMap;
  schedule?: string;
  repeats?: number;
  params?: ParamMap;
};

export type TestSuiteWithExecution = {
  dataList: TestSuite;
  latestExecution?: TestSuiteExecution;
};
