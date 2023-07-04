import {useContext} from 'react';

import {EntityDetailsContext} from '@contexts';

import {Definition, DefinitionProps} from '@molecules';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

import {settingsDefinitionData} from './utils';

const SourceDefinition = () => {
  const {entityDetails, entity} = useContext(EntityDetailsContext);

  const sectionData = settingsDefinitionData[entity];
  const config: Partial<DefinitionProps> =
    entity === 'tests'
      ? {
          crdUrl: testkubeCRDBases.tests,
          overrideSchema: createSchemaOverride($ => {
            $.required('spec', 'apiVersion', 'kind');
            $.property('metadata').required('name');
            $.property('apiVersion').merge({pattern: '^tests\\.testkube\\.io/v3$'});
            $.property('kind').merge({const: 'Test'});
          }),
        }
      : {
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
      useGetDefinitionQuery={sectionData.query}
      useUpdateDefinitionMutation={sectionData.mutation}
      label={entity.slice(0, -1)}
      name={entityDetails.name}
      {...config}
    />
  );
};

export default SourceDefinition;
