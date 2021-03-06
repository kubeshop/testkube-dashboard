import {EntityExecutionsBlueprint} from '@models/entityExecution';

import {useGetTestSuiteExecutionsByTestIdQuery} from '@services/testSuiteExecutions';
import {useGetTestSuiteDetailsQuery} from '@services/testSuites';

const TestSuiteExecutionsConfig: EntityExecutionsBlueprint = {
  entity: 'test-suites',
  useGetExecutions: useGetTestSuiteExecutionsByTestIdQuery,
  useGetEntityDetails: useGetTestSuiteDetailsQuery,
  defaultStackRoute: '/test-suites',
};

export default TestSuiteExecutionsConfig;
