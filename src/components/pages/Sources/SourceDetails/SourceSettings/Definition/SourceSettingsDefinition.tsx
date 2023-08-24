import {FC} from 'react';

import {Definition} from '@molecules/Definition';

import {useGetSourceDefinitionQuery, useUpdateSourceDefinitionMutation} from '@services/sources';

import {useSourcesPick} from '@store/sources';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

export const SourceSettingsDefinition: FC = () => {
  const {current} = useSourcesPick('current');
  return (
    <Definition
      useGetDefinitionQuery={useGetSourceDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateSourceDefinitionMutation}
      label="source"
      name={current!.name}
      crdUrl={testkubeCRDBases.sources}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({const: 'tests.testkube.io/v1'});
        $.property('kind').merge({const: 'TestSource'});
      })}
    />
  );
};
