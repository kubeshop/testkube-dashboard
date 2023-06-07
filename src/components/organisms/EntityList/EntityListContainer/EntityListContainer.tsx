import {EntityListContext} from '@contexts';

import {EntityListBlueprint} from '@models/entity';

import {useAppSelector} from '@redux/hooks';

import EntityListContent from '../EntityListContent';

const EntityListContainer: React.FC<EntityListBlueprint> = props => {
  const {
    selectData,
    selectQueryFilters,
    selectAllFilters,
    useGetMetrics,
    useAbortAllExecutions,
    setQueryFilters,
    ...rest
  } = props;

  const dataSource = useAppSelector(selectData);
  const queryFilters = useAppSelector(selectQueryFilters);
  const allFilters = useAppSelector(selectAllFilters);

  const entityListContextValues = {
    dataSource,
    queryFilters,
    setQueryFilters,
    allFilters,
    useGetMetrics,
    entity: rest.entity,
    useAbortAllExecutions,
  };

  return (
    <EntityListContext.Provider value={entityListContextValues}>
      <EntityListContent {...rest} />
    </EntityListContext.Provider>
  );
};

export default EntityListContainer;
