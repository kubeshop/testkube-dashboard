import type {Execution} from '@models/execution';
import type {TestSuiteExecution} from '@models/testSuiteExecution';

export function isExecutionFinished(data: TestSuiteExecution | Execution | null | undefined): boolean {
  const status = (data as Execution)?.executionResult?.status || (data as TestSuiteExecution)?.status;
  return Boolean(status) && !['queued', 'pending', 'running'].includes(status);
}
