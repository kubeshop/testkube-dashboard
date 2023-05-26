import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/src/query/endpointDefinitions';

import {Entity} from '@models/entity';

import {useGetTestSuiteDefinitionQuery} from '@services/testSuites';
import {useGetTestDefinitionQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';

export const settingsDefinitionData: Record<
  Entity,
  {
    description: string;
    helpLinkUrl: string;
    query: UseQuery<QueryDefinition<string, any, any, string>>;
  }
> = {
  'test-suites': {
    description: 'Validate and export your test suite configuration',
    helpLinkUrl: externalLinks.createTestSuite,
    query: useGetTestSuiteDefinitionQuery,
  },
  tests: {
    description: 'Validate and export your test configuration',
    helpLinkUrl: externalLinks.createTest,
    query: useGetTestDefinitionQuery,
  },
};
