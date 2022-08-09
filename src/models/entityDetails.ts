import {QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Entity} from './entity';

export type EntityDetailsBlueprintProps = {
  entity: Entity;
};

export type EntityDetailsBlueprint = {
  entity: Entity;
  emptyDetailsComponent?: any;
  useGetExecutions: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetEntityDetails: UseQuery<QueryDefinition<any, any, any, any, any>>;
  setExecutions?: any;
  selectExecutions?: any;
  defaultStackRoute: string;
};
