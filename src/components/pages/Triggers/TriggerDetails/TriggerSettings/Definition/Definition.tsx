import {Definition} from '@molecules';

import {useGetTriggerDefinitionQuery, useUpdateTriggerDefinitionMutation} from '@services/triggers';

import {useStore} from '@store';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const TriggerDefinition = () => {
  const {currentTrigger, setCurrentTrigger} = useStore(state => ({
    currentTrigger: state.currentTrigger!,
    setCurrentTrigger: state.setCurrentTrigger,
  }));

  return (
    <Definition
      useGetDefinitionQuery={useGetTriggerDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateTriggerDefinitionMutation}
      label="trigger"
      onUpdate={setCurrentTrigger}
      name={currentTrigger.name}
      crdUrl={testkubeCRDBases.triggers}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({const: 'tests.testkube.io/v1'});
        $.property('kind').merge({const: 'TestTrigger'});
      })}
    />
  );
};

export default TriggerDefinition;
