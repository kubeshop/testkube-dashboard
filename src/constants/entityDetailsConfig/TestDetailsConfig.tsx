import {EntityExecutionsBlueprint} from '@models/entityExecution';

import {useGetTestExecutionsByIdQuery} from '@services/tests';

export const TestDetailsConfig: EntityExecutionsBlueprint = {
  entity: 'tests',
  useGetExecutions: useGetTestExecutionsByIdQuery,
};
