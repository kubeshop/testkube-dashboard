import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/src/query/endpointDefinitions';

import {Entity} from '@models/entity';

import {useGetTestSuiteDefinitionQuery} from '@services/testSuites';
import {useGetTestDefinitionQuery} from '@services/tests';

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
    helpLinkUrl: 'https://docs.testkube.io/articles/creating-test-suites',
    query: useGetTestSuiteDefinitionQuery,
  },
  tests: {
    description: 'Validate and export your test configuration',
    helpLinkUrl: 'https://docs.testkube.io/articles/creating-tests',
    query: useGetTestDefinitionQuery,
  },
};
