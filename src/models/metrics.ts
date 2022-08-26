import {ExecutionStatusEnum} from './execution';

export type ExecutionMetrics = {
  executionId?: string;
  duration: string;
  durationMs: number;
  status: ExecutionStatusEnum;
  name: string;
  startTime: string;
};

export type Metrics = {
  executionDurationP50: string;
  executionDurationP50ms: number;
  executionDurationP90: string;
  executionDurationP90ms: number;
  executionDurationP95: string;
  executionDurationP95ms: number;
  executionDurationP99: string;
  executionDurationP99ms: number;
  failedExecutions: number;
  passFailRatio: number;
  totalExecutions: number;
  executions: ExecutionMetrics[];
};
