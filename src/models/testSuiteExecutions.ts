import {Entity} from '@models/entityMap';

export type TestSuiteExecutionStatus = 'queued' | 'running' | 'passed' | 'failed';

export enum TestSuiteExecutionStatusesKeysEnum {
  passed = 'passed',
  success = 'success',
  pending = 'pending',
  running = 'running',
  failed = 'failed',
  error = 'error',
  queued = 'queued',
}

export enum TestSuiteExecutionStatusesEnum {
  passed = 'Passed',
  success = 'Passed',
  running = 'Running',
  pending = 'Running',
  failed = 'Failed',
  error = 'Failed',
  queued = 'Queued',
  neverRun = 'Never Run',
}

export type TestSuiteExecution = {
  description?: string;
  id: string;
  name: string;
  status?: TestSuiteExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  duration?: string;
  labels: Entity[];
  // TBD
  stepResults: any;
  // TBD
  envs: any;
  // TBD
  params: any;
  executionResult?: any;
};

interface TestSuiteExecutionsState {
  isLoading?: boolean;
  dataList: TestSuiteExecution[];
  filters: {textSearch?: string; pageSize?: number; page: 0; selector: string};
  totals: {};
  filtered: {};
  selectedTestSuiteExecution?: TestSuiteExecution | null;
}

export type {TestSuiteExecutionsState};
