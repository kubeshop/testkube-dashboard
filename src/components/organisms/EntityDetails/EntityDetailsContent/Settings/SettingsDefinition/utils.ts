import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/src/query/endpointDefinitions';

import {Entity} from '@models/entity';

import {useGetTestDefinitionQuery} from '@services/tests';
import {useGetTestSuiteDefinitionQuery} from '@services/testSuites';

export const settingsDefinitionData: Record<Entity, {
  description: string;
  helpLinkUrl: string;
  query: UseQuery<QueryDefinition<string, any, any, string>>
}> = {
  'test-suites': {
    description: 'Validate and export your test suite configuration',
    helpLinkUrl: 'https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/',
    query: useGetTestSuiteDefinitionQuery,
  },
  tests: {
    description: 'Validate and export your test configuration',
    helpLinkUrl: 'https://kubeshop.github.io/testkube/using-testkube/tests/tests-creating/',
    query: useGetTestDefinitionQuery,
  },
};
