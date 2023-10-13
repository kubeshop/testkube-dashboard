import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export enum WSEventType {
  START_TEST = 'start-test',
  START_TEST_SUITE = 'start-testsuite',

  END_TEST_SUCCESS = 'end-test-success',
  END_TEST_SUITE_SUCCESS = 'end-testsuite-success',

  END_TEST_FAILED = 'end-test-failed',
  END_TEST_SUITE_FAILED = 'end-testsuite-failed',

  END_TEST_ABORT = 'end-test-aborted',
  END_TEST_TIMEOUT = 'end-test-timeout',

  END_TEST_SUITE_ABORT = 'end-testsuite-aborted',
  END_TEST_SUITE_TIMEOUT = 'end-testsuite-timeout',
}

export interface WSData {
  type: WSEventType;
}

export interface WSDataWithTestExecution extends WSData {
  testExecution: Execution;
}

export interface WSDataWithTestSuiteExecution extends WSData {
  testSuiteExecution: TestSuiteExecution;
}
