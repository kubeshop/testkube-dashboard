import {EntityDetailsBlueprint} from '@models/entityDetails';

import {useGetTestExecutionsByIdQuery, useGetTestQuery} from '@services/tests';

const TestExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'tests',
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
  defaultStackRoute: '/tests',
};

export default TestExecutionsConfig;
