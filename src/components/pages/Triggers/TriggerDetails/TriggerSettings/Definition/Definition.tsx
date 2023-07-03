import {Definition} from '@molecules';

import {useGetTriggerDefinitionQuery, useUpdateTriggerDefinitionMutation} from '@services/triggers';

import {useStore} from '@store';

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
      setEntity={setCurrentTrigger}
      name={currentTrigger.name}
      crdUrl={testkubeCRDBases.triggers}
    />
  );
};

export default TriggerDefinition;
