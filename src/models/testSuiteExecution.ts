import {EnvMap} from '@models/env';
import {LabelMap} from '@models/labels';
import {ObjectRef} from '@models/objectRef';
import {ParamMap} from '@models/param';

export type TestSuiteExecutionStatus = 'running' | 'passed' | 'failed' | 'queued';

export type TestSuiteExecution = {
  id: string;
  name: string;
  testSuite?: ObjectRef;
  status?: TestSuiteExecutionStatus;
  envs?: EnvMap;
  params?: ParamMap;
  startTime?: string;
  endTime?: string;
  duration?: string;
  labels?: LabelMap;
};
