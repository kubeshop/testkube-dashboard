import {FC} from 'react';

import {Definition} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {useGetExecutorDefinitionQuery, useUpdateExecutorDefinitionMutation} from '@services/executors';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

interface ExecutorDefinitionProps {
  reload: () => void;
}

const ExecutorDefinition: FC<ExecutorDefinitionProps> = ({reload}) => {
  const executor = useAppSelector(selectCurrentExecutor)!;
  return (
    <Definition
      useGetDefinitionQuery={useGetExecutorDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateExecutorDefinitionMutation}
      label="executor"
      onUpdate={reload}
      name={executor.name}
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

export default ExecutorDefinition;
