import {EnvMap} from '@models/env';
import {ExecutionStatusEnum} from '@models/execution';
import {LabelMap} from '@models/labels';
import {ObjectRef} from '@models/objectRef';
import {ParamMap} from '@models/param';

export type TestSuiteExecution = {
  id: string;
  name: string;
  testSuite?: ObjectRef;
  status?: ExecutionStatusEnum;
  envs?: EnvMap;
  params?: ParamMap;
  startTime?: string;
  endTime?: string;
  duration?: string;
  labels?: LabelMap;
};
