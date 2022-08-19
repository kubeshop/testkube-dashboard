import {createContext} from 'react';

import {EntityListBlueprint} from '@models/entity';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint, selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import EntityListContent from '../EntityListContent';

export const EntityListContext = createContext<{
  dataSource: any;
  queryFilters: any;
  allFilters: any;
  useGetMetrics: any;
}>({
  dataSource: [],
  queryFilters: {},
  allFilters: {},
  useGetMetrics: () => {},
});

const EntityListContainer: React.FC<EntityListBlueprint> = props => {
  const {selectData, selectQueryFilters, selectAllFilters, useGetMetrics, ...rest} = props;

  const dataSource = useAppSelector(selectData);
  const queryFilters = useAppSelector(selectQueryFilters);
  const allFilters = useAppSelector(selectAllFilters);
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const entityListContextValues = {
    dataSource,
    queryFilters,
    allFilters,
    useGetMetrics,
  };

  return (
    <EntityListContext.Provider value={entityListContextValues}>
      <EntityListContent {...rest} />
    </EntityListContext.Provider>
  );
};

export default EntityListContainer;
