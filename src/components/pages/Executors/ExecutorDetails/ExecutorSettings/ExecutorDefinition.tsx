import {FC} from 'react';

import {Definition} from '@molecules/Definition';

import {useGetExecutorDefinitionQuery, useUpdateExecutorDefinitionMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

export const ExecutorDefinition: FC = () => {
  const {current} = useExecutorsPick('current');
  return (
    <Definition
      useGetDefinitionQuery={useGetExecutorDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateExecutorDefinitionMutation}
      label="executor"
      name={current!.name}
      crdUrl={testkubeCRDBases.executors}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({const: 'executor.testkube.io/v1'});
        $.property('kind').merge({const: 'Executor'});
      })}
    />
  );
};
