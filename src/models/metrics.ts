/* eslint-disable camelcase */

export type ExecutionMetrics = {
  executionId?: string;
  duration: string;
  duration_ms: number;
  status: string;
};

export type Metrics = {
  execution_duration_p50: string;
  execution_duration_p90: string;
  execution_duration_p99: string;
  failed_executions: number;
  pass_fail_ratio: number;
  total_executions: number;
  executions: ExecutionMetrics[];
};
