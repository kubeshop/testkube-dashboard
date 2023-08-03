import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export type EntityDetailsBlueprint = {
  useGetExecutions: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetEntityDetails: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useGetMetrics: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
  useAbortAllExecutions: UseMutation<MutationDefinition<any, any, any, any, any>>;
  useGetExecutionDetails: UseQuery<QueryDefinition<string, any, any, any, any>>;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
  useDeleteEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
  defaultStackRoute: string;
  label: string;
  variablesDescription: string;
};
