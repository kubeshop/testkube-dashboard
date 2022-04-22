import moment from 'moment';

import {Args} from '@models/args';
import {AssertionResult} from '@models/assertionResult';
import {EnvMap} from '@models/env';
import {LabelMap} from '@models/labels';
import {ParamMap} from '@models/param';
import {TestContent} from '@models/test';
import {TestExecutor} from '@models/testExecutors';

export type ExecutionResultStatusEnum = 'running' | 'passed' | 'failed' | 'queued';
export type ExecutionResultOutputTypeEnum = 'text/plain' | 'application/junit+xml' | 'application/json';
export type ExecutionStepResultStatusEnum = 'success' | 'error';

export type ExecutionStepResult = {
  name: string;
  duration?: string;
  status: ExecutionStepResultStatusEnum;
  assertionResults: AssertionResult;
};

export type ExecutionResult = {
  status: ExecutionResultStatusEnum;
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
  envs: EnvMap;
  args: Args;
  params: ParamMap;
  paramsFile: string;
  content: TestContent;
  startTime: moment.MomentInput;
  endTime: moment.MomentInput;
  duration: string;
  executionResult: ExecutionResult;
  labels: LabelMap;
};
