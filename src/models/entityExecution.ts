import {QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Entity} from './entity';

export type EntityExecutionsBlueprintProps = {
  entity: Entity;
};

export type EntityExecutionsBlueprint = {
  entity?: Entity;
  emptyDetailsComponent?: any;
  useGetExecutions?: UseQuery<QueryDefinition<any, any, any, any, any>>;
  setExecutions?: any;
  selectExecutions?: any;
};
