/* eslint-disable camelcase */
import {ExecutionStatusEnum} from './execution';

export type ExecutionMetrics = {
  executionId?: string;
  duration: string;
  duration_ms: number;
  status: ExecutionStatusEnum;
  name: string;
  startTime: string;
};

export type Metrics = {
  execution_duration_p50: string;
  execution_duration_p50_ms: number;
  execution_duration_p90: string;
  execution_duration_p90_ms: number;
  execution_duration_p95: string;
  execution_duration_p95_ms: number;
  execution_duration_p99: string;
  execution_duration_p99_ms: number;
  failed_executions: number;
  pass_fail_ratio: number;
  total_executions: number;
  executions: ExecutionMetrics[];
};
