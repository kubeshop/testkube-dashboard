import {EntityMap} from '@models/entityMap';
import {ExecutionStatusEnum} from '@models/execution';
import {ObjectRef} from '@models/objectRef';

import {TestSuiteStepExecutionResult} from './testSuite';

export type TestSuiteExecution = {
  id: string;
  name: string;
  testSuite: ObjectRef;
  status?: ExecutionStatusEnum;
  envs?: EntityMap;
  secretUUID?: string;
  secret?: string;
  params?: EntityMap;
  startTime: Date;
  endTime: Date;
  duration?: string;
  labels?: EntityMap;
  stepResults?: TestSuiteStepExecutionResult[];
};
