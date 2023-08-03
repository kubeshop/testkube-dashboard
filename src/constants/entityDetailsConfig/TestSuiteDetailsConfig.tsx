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
  useGetTestSuiteDefinitionQuery,
  useGetTestSuiteDetailsQuery,
  useUpdateTestSuiteDefinitionMutation,
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
  useGetDefinition: useGetTestSuiteDefinitionQuery,
  useUpdateDefinition: useUpdateTestSuiteDefinitionMutation,
  defaultStackRoute: '/test-suites',
  label: 'test suite',
  variablesDescription: 'Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level.',
};

export default TestSuiteExecutionsConfig;
