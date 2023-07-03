import {Definition} from '@molecules';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor} from '@redux/reducers/executorsSlice';

import {useGetExecutorDefinitionQuery, useUpdateExecutorDefinitionMutation} from '@services/executors';

import {testkubeCRDBases} from '@utils/externalLinks';

const ExecutorDefinition = () => {
  const executor = useAppSelector(selectCurrentExecutor)!;

  const dispatch = useAppDispatch();

  return (
    <Definition
      useGetDefinitionQuery={useGetExecutorDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateExecutorDefinitionMutation}
      label="executor"
      setEntity={dispatch(setCurrentExecutor)}
      name={executor.name}
      crdUrl={testkubeCRDBases.executors}
    />
  );
};

export default ExecutorDefinition;
