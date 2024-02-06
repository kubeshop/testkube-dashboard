import type {Args} from '@models/args';
import type {AssertionResult} from '@models/assertionResult';
import type {EntityMap} from '@models/entityMap';
import type {TestContent} from '@models/test';
import type {TestExecutor} from '@models/testExecutors';
import type {Variables} from '@models/variable';

export const executionStatusList = ['running', 'passed', 'failed', 'queued', 'timeout', 'aborted'] as const;

export type ExecutionStatusEnum = (typeof executionStatusList)[number];
export type ExecutionResultOutputTypeEnum = 'text/plain' | 'application/junit+xml' | 'application/json';
export type ExecutionStepResultStatusEnum = 'success' | 'error';
export type ExecutionArgsModeEnum = 'append' | 'override';

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
  testSuiteName?: string;
  testNamespace: string;
  testType: TestExecutor;
  name: string;
  envs: EntityMap;
  args: Args;
  args_mode?: ExecutionArgsModeEnum;
  params: EntityMap;
  paramsFile: string;
  content: TestContent;
  startTime: string; // ISO Date
  endTime: string; // ISO Date
  duration: string;
  executionResult: ExecutionResult;
  labels: EntityMap;
  number: number;
  variables?: Variables;
  runningContext: any;
  status: ExecutionStatusEnum;
  durationMs: number;
};

export type ExecutionRequest = {
  description: string;
  name: string;
  testSuiteName?: string;
  number: number;
  executionLabels: EntityMap;
  namespace: string;
  variablesFile: string;
  variables?: Variables;
  testSecretUUID: string;
  testSuiteSecretUUID: string;
  args: Args;
  args_mode?: ExecutionArgsModeEnum;
  image: string;
  envs: EntityMap;
  secretEnvs: EntityMap;
  sync: boolean;
  httpProxy: string;
  httpsProxy: string;
  activeDeadlineSeconds?: number;
};

export type ExecutionTotals = {
  results: number;
  passed: number;
  failed: number;
  queued: number;
  running: number;
};

export type ExecutionsResponse = {
  results: Execution[];
  totals: ExecutionTotals;
  filtered: ExecutionTotals;
};
