export type TestExecutor =
  | 'postman/collection'
  | 'cypress/project'
  | 'curl/test'
  | 'test/curl'
  | 'postman/custom'
  | 'k6/script'
  | 'unknown';

export type UnknownTestExecutor = 'Unknown test type';

export type TestExecutorName = 'Postman' | 'Cypress' | 'Curl' | 'K6' | UnknownTestExecutor;

export type TestExecutorConfig = {
  canHaveArtifacts: boolean;
};
