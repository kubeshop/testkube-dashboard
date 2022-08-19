import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestIdQuery,
} from '@services/testSuiteExecutions';
import {useGetTestSuiteDetailsQuery} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'test-suites',
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  defaultStackRoute: '/test-suites',
};

export default TestSuiteExecutionsConfig;
