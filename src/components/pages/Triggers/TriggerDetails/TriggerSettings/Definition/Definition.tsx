import {useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {Pre} from '@atoms';

import {MainContext} from '@contexts';

import {ConfigurationCard} from '@molecules';
import DefinitionMonaco from '@molecules/Definition/DefinitionMonaco';

import {useGetTriggerDefinitionQuery, useUpdateTriggerDefinitionMutation} from '@services/triggers';

import {testkubeCRDBases} from '@src/utils/externalLinks';

import {useStore} from '@store';

const TriggerDefinition = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const [value, setValue] = useState('');

  const {currentTrigger} = useStore(state => ({
    currentTrigger: state.currentTrigger!,
  }));

  const {
    data: definition = '',
    isLoading,
    refetch,
  } = useGetTriggerDefinitionQuery(currentTrigger.name, {
    skip: !isClusterAvailable,
  });

  const [updateTrigger] = useUpdateTriggerDefinitionMutation();

  useEffect(() => {
    setValue(definition);
  }, [definition]);

  useEffect(() => {
    if (currentTrigger) {
      refetch();
    }
  }, [currentTrigger]);

  const onSave = () => {
    updateTrigger({name: currentTrigger.name, value}).then(res => {
      console.log(res);
    });
  };

  return (
    <Form name="definition-form">
      <ConfigurationCard
        title="Definition"
        description="Validate and export your trigger configuration"
        onConfirm={onSave}
        forceEnableButtons
      >
        {definition || isLoading ? (
          <DefinitionMonaco
            value={value}
            onChange={setValue}
            isDefinitionLoading={isLoading}
            crdUrl={testkubeCRDBases.triggers}
          />
        ) : (
          <Pre> No definition data</Pre>
        )}
      </ConfigurationCard>
    </Form>
  );
};

export default TriggerDefinition;
