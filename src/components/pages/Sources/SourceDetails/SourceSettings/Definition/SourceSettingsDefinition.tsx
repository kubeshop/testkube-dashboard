import {Definition} from '@molecules';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDefinitionQuery, useUpdateSourceDefinitionMutation} from '@services/sources';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const SourceSettingsDefinition = () => {
  const source = useAppSelector(selectCurrentSource)!;

  const dispatch = useAppDispatch();

  return (
    <Definition
      useGetDefinitionQuery={useGetSourceDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateSourceDefinitionMutation}
      label="source"
      onUpdate={value => dispatch(setCurrentSource(value))}
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
