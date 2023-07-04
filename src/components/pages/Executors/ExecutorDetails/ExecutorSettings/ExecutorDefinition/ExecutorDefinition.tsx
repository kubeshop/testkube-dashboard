import {Definition} from '@molecules';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor} from '@redux/reducers/executorsSlice';

import {useGetExecutorDefinitionQuery, useUpdateExecutorDefinitionMutation} from '@services/executors';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const ExecutorDefinition = () => {
  const executor = useAppSelector(selectCurrentExecutor)!;

  const dispatch = useAppDispatch();

  return (
    <Definition
      useGetDefinitionQuery={useGetExecutorDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateExecutorDefinitionMutation}
      label="executor"
      setEntity={value => dispatch(setCurrentExecutor(value))}
      name={executor.name}
      crdUrl={testkubeCRDBases.executors}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({const: 'tests.testkube.io/v1'});
        $.property('kind').merge({const: 'Executor'});
      })}
    />
  );
};

export default ExecutorDefinition;
