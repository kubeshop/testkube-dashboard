import {createContext, useContext} from 'react';

import {Entity, EntityListBlueprint} from '@models/entity';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import {MainContext} from '@contexts';

import EntityListContent from '../EntityListContent';

export const EntityListContext = createContext<{
  dataSource: any;
  queryFilters: any;
  allFilters: any;
  useGetMetrics: any;
  entity?: Entity;
}>({
  dataSource: [],
  queryFilters: {},
  allFilters: {},
  useGetMetrics: () => {},
});

const EntityListContainer: React.FC<EntityListBlueprint> = props => {
  const {selectData, selectQueryFilters, selectAllFilters, useGetMetrics, ...rest} = props;

  const {apiEndpoint} = useContext(MainContext);

  const dataSource = useAppSelector(selectData);
  const queryFilters = useAppSelector(selectQueryFilters);
  const allFilters = useAppSelector(selectAllFilters);
  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const entityListContextValues = {
    dataSource,
    queryFilters,
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
