import {MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/src/query/endpointDefinitions';

import {Entity} from '@models/entity';
import {YamlEditBody} from '@models/fetch';

import {useGetTestSuiteDefinitionQuery, useUpdateTestSuiteDefinitionMutation} from '@services/testSuites';
import {useGetTestDefinitionQuery, useUpdateTestDefinitionMutation} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';

export const settingsDefinitionData: Record<
  Entity,
  {
    description: string;
    helpLinkUrl: string;
    query: UseQuery<QueryDefinition<string, any, any, string>>;
    mutation: UseMutation<MutationDefinition<YamlEditBody, any, any, any, any>>;
  }
> = {
  'test-suites': {
    description: 'Validate and export your test suite configuration',
    helpLinkUrl: externalLinks.createTestSuite,
    query: useGetTestSuiteDefinitionQuery,
    mutation: useUpdateTestSuiteDefinitionMutation,
  },
  tests: {
    description: 'Validate and export your test configuration',
    helpLinkUrl: externalLinks.createTest,
    query: useGetTestDefinitionQuery,
    mutation: useUpdateTestDefinitionMutation,
  },
};
