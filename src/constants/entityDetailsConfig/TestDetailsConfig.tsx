import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useAbortAllTestExecutionsMutation,
  useAbortTestExecutionMutation,
  useDeleteTestMutation,
  useGetTestDefinitionQuery,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
  useUpdateTestDefinitionMutation,
  useUpdateTestMutation,
} from '@services/tests';

const TestExecutionsConfig: EntityDetailsBlueprint = {
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  useAbortExecution: useAbortTestExecutionMutation,
  useAbortAllExecutions: useAbortAllTestExecutionsMutation,
  useGetExecutionDetails: useGetTestExecutionByIdQuery,
  useUpdateEntity: useUpdateTestMutation,
  useDeleteEntity: useDeleteTestMutation,
  useGetDefinition: useGetTestDefinitionQuery,
  useUpdateDefinition: useUpdateTestDefinitionMutation,
  defaultStackRoute: '/tests',
  label: 'test',
  variablesDescription: 'Define environment variables which will be shared across your test.',
};

export default TestExecutionsConfig;
