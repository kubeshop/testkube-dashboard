export enum WSEventType {
  START_TEST = 'start-test',
  END_TEST_SUCCESS = 'end-test-success',
}

export type WSData = {
  type: WSEventType;
  testExecution?: any;
};
