import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {Definition} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

// TODO: Split
const SettingsDefinition = () => {
  const {details, entity} = useEntityDetailsPick('details', 'entity');
  const {useGetDefinition, useUpdateDefinition} = useEntityDetailsConfig(entity);

  const config =
    entity === 'tests'
      ? {
          label: 'test',
          crdUrl: testkubeCRDBases.tests,
          overrideSchema: createSchemaOverride($ => {
            $.required('spec', 'apiVersion', 'kind');
            $.property('metadata').required('name');
            $.property('apiVersion').merge({pattern: '^tests\\.testkube\\.io/v3$'});
            $.property('kind').merge({const: 'Test'});
          }),
        }
      : {
          label: 'test suite',
          crdUrl: testkubeCRDBases.testSuites,
          overrideSchema: createSchemaOverride($ => {
            $.required('spec', 'apiVersion', 'kind');
            $.property('metadata').required('name');
            $.property('apiVersion').merge({pattern: '^tests\\.testkube\\.io/v[23]$'});
            $.property('kind').merge({const: 'TestSuite'});
          }),
        };

  return (
    <Definition
      useGetDefinitionQuery={useGetDefinition}
      useUpdateDefinitionMutation={useUpdateDefinition}
      name={details.name}
      {...config}
    />
  );
};

export default SettingsDefinition;
