export type TestExecutor =
  | 'postman/collection'
  | 'postman/custom'
  //
  | 'cypress/project'
  //
  | 'curl/test'
  | 'test/curl'
  //
  | 'k6/script'
  //
  | 'soapui/xml'
  //
  | 'artillery/test'
  //
  | 'unknown';

export type UnknownTestExecutor = 'Unknown test type';

export type TestExecutorName = 'Postman' | 'Cypress' | 'Curl' | 'K6' | 'SoapUI' | 'Artillery' | UnknownTestExecutor;

export type TestExecutorConfig = {
  canHaveArtifacts: boolean;
};
