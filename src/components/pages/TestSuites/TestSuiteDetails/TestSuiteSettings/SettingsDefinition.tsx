import {FC} from 'react';

import {Definition} from '@molecules/Definition';

import {useGetTestSuiteDefinitionQuery, useUpdateTestSuiteDefinitionMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

export const SettingsDefinition: FC = () => {
  const {details} = useEntityDetailsPick('details');
  return (
    <Definition
      useGetDefinitionQuery={useGetTestSuiteDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateTestSuiteDefinitionMutation}
      label="test suite"
      name={details.name}
      crdUrl={testkubeCRDBases.testSuites}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({pattern: '^tests\\.testkube\\.io/v[23]$'});
        $.property('kind').merge({const: 'TestSuite'});
      })}
    />
  );
};
