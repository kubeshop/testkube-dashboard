import {createContext} from 'react';

import {Entity} from '@models/entity';

const EntityListContext = createContext<{
  dataSource: any;
  queryFilters: any;
  setQueryFilters: any;
  allFilters: any;
  useGetMetrics: any;
  entity?: Entity;
  useAbortAllExecutions: any;
}>({
  dataSource: [],
  queryFilters: {},
  setQueryFilters: () => {},
  allFilters: {},
  useGetMetrics: () => {},
  useAbortAllExecutions: () => {},
});

export default EntityListContext;
