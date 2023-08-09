export enum WebhookEvent {
  StartTest = 'start-test',
  EndTestSuccess = 'end-test-success',
  EndTestFailed = 'end-test-failed',
  EndTestAborted = 'end-test-aborted',
  EndTestTimeout = 'end-test-timeout',
  StartTestSuite = 'start-testsuite',
  EndTestSuiteSuccess = 'end-testsuite-success',
  EndTestSuiteFailed = 'end-testsuite-failed',
  EndTestSuiteAborted = 'end-testsuite-aborted',
  EndTestSuiteTimeout = 'end-testsuite-timeout',
  Created = 'created',
  Updated = 'updated',
  Deleted = 'deleted',
}

export type Webhook = {
  name?: string;
  namespace?: string;
  uri: string;
  events: WebhookEvent[];
  selector?: string;
  payloadObjectField?: string;
  payloadTemplate?: string;
  headers?: Record<string, string>;
  labels?: Record<string, string>;
};
