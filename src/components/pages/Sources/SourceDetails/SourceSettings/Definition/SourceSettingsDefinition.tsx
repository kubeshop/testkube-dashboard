import {Definition} from '@molecules';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDefinitionQuery, useUpdateSourceDefinitionMutation} from '@services/sources';

import {testkubeCRDBases} from '@utils/externalLinks';

const SourceDefinition = () => {
  const source = useAppSelector(selectCurrentSource)!;

  const dispatch = useAppDispatch();

  return (
    <Definition
      useGetDefinitionQuery={useGetSourceDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateSourceDefinitionMutation}
      label="source"
      setEntity={dispatch(setCurrentSource)}
      name={source.name}
      crdUrl={testkubeCRDBases.sources}
    />
  );
};

export default SourceDefinition;
