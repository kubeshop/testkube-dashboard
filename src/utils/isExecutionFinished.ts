import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export function isExecutionFinished(data: TestSuiteExecution | Execution | null | undefined): boolean {
  const status = (data as Execution)?.executionResult?.status || (data as TestSuiteExecution)?.status;
  return ['queued', 'pending', 'running'].includes(status);
}
