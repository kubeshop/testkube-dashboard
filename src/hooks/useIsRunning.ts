import {TestSuiteExecutionStatus} from '@models/testSuiteExecutions';

const useIsRunning = (status: TestSuiteExecutionStatus) => {
  return status === 'running';
};

export default useIsRunning;
