import {FC} from 'react';

import {Definition} from '@molecules';

import {useGetTriggerDefinitionQuery, useUpdateTriggerDefinitionMutation} from '@services/triggers';

import {useStore} from '@store';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

interface TriggerDefinitionProps {
  reload: () => void;
}

const TriggerDefinition: FC<TriggerDefinitionProps> = ({reload}) => {
  const {currentTrigger} = useStore(state => ({
    currentTrigger: state.currentTrigger!,
    setCurrentTrigger: state.setCurrentTrigger,
  }));

  return (
    <Definition
      useGetDefinitionQuery={useGetTriggerDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateTriggerDefinitionMutation}
      label="trigger"
      onUpdate={reload}
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
