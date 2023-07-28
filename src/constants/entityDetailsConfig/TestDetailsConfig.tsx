import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useAbortAllTestExecutionsMutation,
  useAbortTestExecutionMutation,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
} from '@services/tests';

const TestExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'tests',
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  defaultStackRoute: '/tests',
  useAbortExecution: useAbortTestExecutionMutation,
  useAbortAllExecutions: useAbortAllTestExecutionsMutation,
};

export default TestExecutionsConfig;
