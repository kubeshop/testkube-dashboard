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
  | 'gradle/test'
  | 'gradle:jdk18/test'
  //
  | 'maven/test'
  | 'maven:jdk18/test'
  //
  | 'kubepug/yaml'
  //
  | 'unknown';

export type UnknownTestExecutor = 'Unknown test type';

export type TestExecutorName =
  | 'Postman'
  | 'Cypress'
  | 'Curl'
  | 'K6'
  | 'SoapUI'
  | 'Artillery'
  | 'Gradle'
  | 'Gradle 18'
  | 'Maven'
  | 'Kubepug'
  | UnknownTestExecutor;

export type TestExecutorConfig = {
  canHaveArtifacts: boolean;
};
