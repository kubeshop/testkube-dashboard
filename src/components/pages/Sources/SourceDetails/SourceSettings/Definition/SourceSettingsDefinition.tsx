import {FC} from 'react';

import {Definition} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDefinitionQuery, useUpdateSourceDefinitionMutation} from '@services/sources';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

interface SourceSettingsDefinitionProps {
  reload: () => void;
}

const SourceSettingsDefinition: FC<SourceSettingsDefinitionProps> = ({reload}) => {
  const source = useAppSelector(selectCurrentSource)!;
  return (
    <Definition
      useGetDefinitionQuery={useGetSourceDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateSourceDefinitionMutation}
      label="source"
      onUpdate={reload}
      name={source.name}
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

export default SourceSettingsDefinition;
