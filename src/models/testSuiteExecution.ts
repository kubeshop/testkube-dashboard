import type {EntityMap} from '@models/entityMap';
import type {ExecutionStatusEnum} from '@models/execution';
import type {ObjectRef} from '@models/objectRef';

import type {TestSuiteStepExecutionResult} from './testSuite';

export type TestSuiteExecution = {
  id: string;
  name: string;
  testSuite: ObjectRef;
  status?: ExecutionStatusEnum;
  envs?: EntityMap;
  secretUUID?: string;
  secret?: string;
  params?: EntityMap;
  startTime: string; // ISO Date
  endTime: string; // ISO Date
  duration?: string;
  labels?: EntityMap;
  executeStepResults: TestSuiteStepExecutionResult[];
  runningContext: any;
  number: number;
};
interface TestSuiteExecutionsState {
  isLoading?: boolean;
  dataList: TestSuiteExecution[];
  filters: {textSearch?: string; pageSize?: number; page: number; selector: string};
  totals: {};
  filtered: {};
  selectedTestSuiteExecution?: TestSuiteExecution | null;
}

export type {TestSuiteExecutionsState};
