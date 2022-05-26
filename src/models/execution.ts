import moment from 'moment';

import {Args} from '@models/args';
import {AssertionResult} from '@models/assertionResult';
import {EntityMap} from '@models/entityMap';
import {TestContent} from '@models/test';
import {TestExecutor} from '@models/testExecutors';

export type ExecutionStatusEnum = 'running' | 'passed' | 'failed' | 'queued';
export type ExecutionResultOutputTypeEnum = 'text/plain' | 'application/junit+xml' | 'application/json';
export type ExecutionStepResultStatusEnum = 'success' | 'error';

export type ExecutionStepResult = {
  name: string;
  duration?: string;
  status: ExecutionStepResultStatusEnum;
  assertionResults: AssertionResult;
};

export type ExecutionResult = {
  status: ExecutionStatusEnum;
  output?: string;
  outputType?: ExecutionResultOutputTypeEnum;
  errorMessage?: string;
  steps?: ExecutionStepResult[];
};

export type Execution = {
  id: string;
  testName: string;
  testNamespace: string;
  testType: TestExecutor;
  name: string;
  envs: EntityMap;
  args: Args;
  params: EntityMap;
  paramsFile: string;
  content: TestContent;
  startTime: moment.MomentInput;
  endTime: moment.MomentInput;
  duration: string;
  executionResult: ExecutionResult;
  labels: EntityMap;
};
