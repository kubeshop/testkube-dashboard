import {TestExecutor} from '@models/testExecutors';
import {TestContent, TestName} from '@models/tests';

export type Execution = {
  testName: TestName;
  testType: TestExecutor;
  testContent: TestContent;
  startTime: ExecutionStartTime;
  endTime: ExecutionEndTime;
  name: ExecutionName;
  id: ExecutionId;
  executionResult: ExecutionResult;
  status: ExecutionStatuses;
};

export type ExecutionResult = {
  status: ExecutionStatuses;
  output: ExecutionOutput;
  outputType: ExecutionOutputTypes;
  steps: ExecutionStep[];
};

export type ExecutionStep = {
  assertionResults: ExecutionAssertionResult[];
  duration: ExecutionStepDuration;
  name: ExecutionStepName;
  status: ExecutionStatuses;
};

export type ExecutionAssertionResult = {
  name: ExecutionAssertionResultName;
  status: ExecutionStatuses;
};

export type ExecutionId = string;
export type ExecutionName = string;
export type ExecutionStepName = string;
export type ExecutionAssertionResultName = string;
export type ExecutionOutput = string;
export type ExecutionStepDuration = string;

export type ExecutionStartTime = Date;
export type ExecutionEndTime = Date;

export type ExecutionStatuses = 'passed' | 'running' | 'failed' | 'queued' | 'neverRun' | 'cancelled';
export type ExecutionStepIconType = 'passed' | 'running' | 'failed' | 'queued' | 'code' | 'neverRun' | 'cancelled';
export type ExecutionOutputTypes = 'text/plain';

interface ExecutionsState {
  filters: {
    pageSize: number;
    page: number;
    status: undefined;
    startDate: null;
    endDate: null;
    testName: string;
    type: string;
    labels: Array<any>;
  };
  error: null;
  totals: {
    results: number;
    passed: number;
    failed: number;
    pending: number;
  };
  filtered: {
    results: number;
    passed: number;
    failed: number;
    pending: number;
  };
  selectedTestId: undefined;
  status: undefined;

  executionsList: Execution[];
  isLoading: boolean;
  hasNext: boolean;

  selectedExecution?: Execution | null;
  selectedExecutionInfo?: Execution | null;
}

export type {ExecutionsState};
