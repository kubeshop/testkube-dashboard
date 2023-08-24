import {FC} from 'react';

import {Definition} from '@molecules/Definition';

import {useGetTestDefinitionQuery, useUpdateTestDefinitionMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

export const SettingsDefinition: FC = () => {
  const {details} = useEntityDetailsPick('details');
  return (
    <Definition
      useGetDefinitionQuery={useGetTestDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateTestDefinitionMutation}
      label="test"
      name={details.name}
      crdUrl={testkubeCRDBases.tests}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({pattern: '^tests\\.testkube\\.io/v3$'});
        $.property('kind').merge({const: 'Test'});
      })}
    />
  );
};
