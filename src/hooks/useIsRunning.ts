import {TestSuiteExecutionStatus} from '@src/models/testSuiteExecutions';

const useIsRunning = (status: TestSuiteExecutionStatus) => {
  return status === 'running';
};

export default useIsRunning;
