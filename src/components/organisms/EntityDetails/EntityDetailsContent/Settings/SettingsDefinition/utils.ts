import {Entity} from '@models/entity';

export const settingsDefinitionData: {
  [key in Entity]: {description: string; helpLinkUrl: string; apiEndpoint: string};
} = {
  'test-suites': {
    description: 'Validate and export your test suite configuration',
    helpLinkUrl: 'https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/',
    apiEndpoint: '/test-suite-with-executions/',
  },
  tests: {
    description: 'Validate and export your test configuration',
    helpLinkUrl: 'https://kubeshop.github.io/testkube/using-testkube/tests/tests-creating/',
    apiEndpoint: '/test-with-executions/',
  },
};
