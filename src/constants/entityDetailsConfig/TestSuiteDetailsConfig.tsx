import {EntityDetailsBlueprint} from '@models/entityDetails';

import {
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestIdQuery,
} from '@services/testSuiteExecutions';
import {
  useAbortAllTestSuiteExecutionsMutation,
  useAbortTestSuiteExecutionMutation,
  useDeleteTestSuiteMutation,
  useGetTestSuiteDetailsQuery,
  useUpdateTestSuiteMutation,
} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityDetailsBlueprint = {
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  useAbortExecution: useAbortTestSuiteExecutionMutation,
  useAbortAllExecutions: useAbortAllTestSuiteExecutionsMutation,
  useGetExecutionDetails: useGetTestSuiteExecutionByIdQuery,
  useUpdateEntity: useUpdateTestSuiteMutation,
  useDeleteEntity: useDeleteTestSuiteMutation,
  defaultStackRoute: '/test-suites',
  label: 'test suite',
};

export default TestSuiteExecutionsConfig;
