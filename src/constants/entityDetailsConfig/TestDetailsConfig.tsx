import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useAbortAllTestExecutionsMutation,
  useAbortTestExecutionMutation,
  useDeleteTestMutation,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
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
  defaultStackRoute: '/tests',
  label: 'test',
  variablesDescription: 'Define environment variables which will be shared across your test.',
};

export default TestExecutionsConfig;
