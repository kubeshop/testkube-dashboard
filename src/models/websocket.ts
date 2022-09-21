type WSEventType = 'start-test' | 'end-test-success';

export type WSData = {
  type: WSEventType;
  testExecution?: any;
};
