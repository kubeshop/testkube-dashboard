import {Label} from './labels';

export type TestSuiteExecutionStatus = 'queued' | 'pending' | 'success' | 'error';

export enum TestSuiteExecutionStatusesEnum {
  success = 'Success',
  pending = 'Running',
  error = 'Error',
  queued = 'Queued',
}

export type TestSuiteExecution = {
  description?: string;
  id: string;
  name: string;
  status?: TestSuiteExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  duration?: string;
  labels: Label[];
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
