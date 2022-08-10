import {EntityDetailsBlueprint} from '@models/entityDetails';

import {useGetTestExecutionMetricsQuery, useGetTestExecutionsByIdQuery, useGetTestQuery} from '@services/tests';

const TestExecutionsConfig: EntityDetailsBlueprint = {
  entity: 'tests',
  useGetExecutions: useGetTestExecutionsByIdQuery,
  useGetEntityDetails: useGetTestQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  defaultStackRoute: '/tests',
};

export default TestExecutionsConfig;
