import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
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
  getExecutionsEndpoint: (id: string) => {
    return `/tests/${id}/executions`;
  },
  useAbortExecution: useAbortTestExecutionMutation,
};

export default TestExecutionsConfig;
