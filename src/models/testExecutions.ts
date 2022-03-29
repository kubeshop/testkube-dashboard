export type TestExecutionStatus = 'queued' | 'pending' | 'success' | 'error';

export type TestExecution = {
  duration?: number;
  startTime?: Date;
  endTime?: Date;
  executionResult?: {
    status?: TestExecutionStatus;
  };
};
