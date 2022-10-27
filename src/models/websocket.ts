export enum WSEventType {
  START_TEST = 'start-test',
  END_TEST_SUCCESS = 'end-test-success',
  END_TEST_ABORT = 'end-test-aborted',
  END_TEST_TIMEOUT = 'end-test-timeout',
}

export type WSData = {
  type: WSEventType;
  testExecution?: any;
};
