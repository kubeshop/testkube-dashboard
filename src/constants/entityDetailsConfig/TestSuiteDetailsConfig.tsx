import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestIdQuery,
} from '@services/testSuiteExecutions';
import {
  useAbortAllTestSuiteExecutionsMutation,
  useAbortTestSuiteExecutionMutation,
  useGetTestSuiteDetailsQuery,
} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityDetailsBlueprint = {
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  defaultStackRoute: '/test-suites',
  useAbortExecution: useAbortTestSuiteExecutionMutation,
  useAbortAllExecutions: useAbortAllTestSuiteExecutionsMutation,
  useGetExecutionDetails: useGetTestSuiteExecutionByIdQuery,
};

export default TestSuiteExecutionsConfig;
