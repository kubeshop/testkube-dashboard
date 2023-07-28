import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useAbortAllTestExecutionsMutation,
  useAbortTestExecutionMutation,
  useGetTestExecutionByIdQuery,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
} from '@services/tests';

const TestExecutionsConfig: EntityDetailsBlueprint = {
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  defaultStackRoute: '/tests',
  useAbortExecution: useAbortTestExecutionMutation,
  useAbortAllExecutions: useAbortAllTestExecutionsMutation,
  useGetExecutionDetails: useGetTestExecutionByIdQuery,
};

export default TestExecutionsConfig;
