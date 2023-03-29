import {createContext} from 'react';

import {Entity, EntityListBlueprint} from '@models/entity';

import {useAppSelector} from '@redux/hooks';

import EntityListContent from '../EntityListContent';

export const EntityListContext = createContext<{
  dataSource: any;
  queryFilters: any;
  setQueryFilters: any;
  allFilters: any;
  useGetMetrics: any;
  entity?: Entity;
}>({
  dataSource: [],
  queryFilters: {},
  setQueryFilters: () => {},
  allFilters: {},
  useGetMetrics: () => {},
});

const EntityListContainer: React.FC<EntityListBlueprint> = props => {
  const {selectData, selectQueryFilters, selectAllFilters, useGetMetrics, setQueryFilters, ...rest} = props;

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
  };

  return (
    <EntityListContext.Provider value={entityListContextValues}>
      <EntityListContent {...rest} />
    </EntityListContext.Provider>
  );
};

export default EntityListContainer;
