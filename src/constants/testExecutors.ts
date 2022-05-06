import {TestExecutor, TestExecutorConfig, TestExecutorName} from '@models/testExecutors';

const defaultTestExecutorConfig: TestExecutorConfig = {
  canHaveArtifacts: false,
};

const cypressTestExecutorConfig: TestExecutorConfig = {
  canHaveArtifacts: true,
};

const soapuiTestExecutorConfig: TestExecutorConfig = {
  canHaveArtifacts: true,
};

// @ts-ignore
export const testExecutorsConfigs: {[key in TestExecutor]: TestExecutorConfig} = {
  'cypress/project': cypressTestExecutorConfig,
  'soapui/xml': soapuiTestExecutorConfig,
  unknown: defaultTestExecutorConfig,
};

export const testExecutorsNames: {[key in TestExecutor]: TestExecutorName} = {
  'postman/collection': 'Postman',
  'postman/custom': 'Postman',
  'cypress/project': 'Cypress',
  'curl/test': 'Curl',
  'test/curl': 'Curl',
  'k6/script': 'K6',
  'soapui/xml': 'SoapUI',
  unknown: 'Unknown test type',
};
