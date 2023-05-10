import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Entity} from './entity';

type GetExecutionEndpointFunction = (arg: string) => string;

export type EntityDetailsBlueprint = {
  entity: Entity;
  emptyDetailsComponent?: any;
  useGetExecutions: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetEntityDetails: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetMetrics: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
  useAbortAllExecutions: UseMutation<MutationDefinition<any, any, any, any, any>>;
  setExecutions?: any;
  selectExecutions?: any;
  defaultStackRoute: string;
  getExecutionsEndpoint: string | GetExecutionEndpointFunction;
};
