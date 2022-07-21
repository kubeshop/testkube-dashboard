import {createContext} from 'react';

import {EntityListBlueprint} from '@models/entity';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint, selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import EntityListContent from '../EntityListContent';

export const EntityListContext = createContext<{dataSource: any; queryFilters: any; allFilters: any}>({
  dataSource: [],
  queryFilters: {},
  allFilters: {},
});

const EntityListContainer: React.FC<EntityListBlueprint> = props => {
  const {selectData, selectQueryFilters, selectAllFilters, ...rest} = props;

  const dataSource: any = useAppSelector(selectData);
  const queryFilters: any = useAppSelector(selectQueryFilters);
  const allFilters: any = useAppSelector(selectAllFilters);
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const entityListContextValues = {
    dataSource,
    queryFilters,
    allFilters,
  };

  return (
    <EntityListContext.Provider value={entityListContextValues}>
      <EntityListContent {...rest} />
    </EntityListContext.Provider>
  );
};

export default EntityListContainer;
