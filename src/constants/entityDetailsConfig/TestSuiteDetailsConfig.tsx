import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestIdQuery,
} from '@services/testSuiteExecutions';
import {
  useAbortAllTestSuiteExecutionsMutation,
  useAbortTestSuiteExecutionMutation,
  useGetTestSuiteDetailsQuery,
} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'test-suites',
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  defaultStackRoute: '/test-suites',
  useAbortExecution: useAbortTestSuiteExecutionMutation,
  useAbortAllExecutions: useAbortAllTestSuiteExecutionsMutation,
};

export default TestSuiteExecutionsConfig;
