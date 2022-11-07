import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestIdQuery,
} from '@services/testSuiteExecutions';
import {useAbortTestSuiteExecutionMutation, useGetTestSuiteDetailsQuery} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'test-suites',
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  defaultStackRoute: '/test-suites',
  getExecutionsEndpoint: '/test-suite-executions',
  useAbortExecution: useAbortTestSuiteExecutionMutation,
};

export default TestSuiteExecutionsConfig;
