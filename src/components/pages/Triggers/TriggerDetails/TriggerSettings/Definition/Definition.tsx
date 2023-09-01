import {FC} from 'react';

import {Definition} from '@molecules';

import {useGetTriggerDefinitionQuery, useUpdateTriggerDefinitionMutation} from '@services/triggers';

import {useTriggersField} from '@store/triggers';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const TriggerDefinition: FC = () => {
  const [currentTrigger] = useTriggersField('current');

  return (
    <Definition
      useGetDefinitionQuery={useGetTriggerDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateTriggerDefinitionMutation}
      label="trigger"
      name={currentTrigger!.name}
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
