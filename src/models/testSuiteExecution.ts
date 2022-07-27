import {EntityMap} from '@models/entityMap';
import {ExecutionStatusEnum} from '@models/execution';
import {ObjectRef} from '@models/objectRef';

export type TestSuiteExecution = {
  id: string;
  name: string;
  testSuite: ObjectRef;
  status?: ExecutionStatusEnum;
  envs?: EntityMap;
  params?: EntityMap;
  startTime: Date;
  endTime: Date;
  duration?: string;
  labels?: EntityMap;
};
