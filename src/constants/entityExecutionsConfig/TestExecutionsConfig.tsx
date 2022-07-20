import {EntityExecutionsBlueprint} from '@models/entityExecution';

import {useGetTestExecutionsByIdQuery, useGetTestQuery} from '@services/tests';

const TestExecutionsConfig: EntityExecutionsBlueprint = {
  entity: 'tests',
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
};

export default TestExecutionsConfig;
