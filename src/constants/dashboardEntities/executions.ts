import {DashboardBlueprint} from '@models/dashboard';

import {Executions} from '@pages';

export const ExecutionsEntity: DashboardBlueprint = {
  entityType: 'executions',
  route: '/dashboard/executions',
  pageTitle: 'Executions',
  component: Executions,
};

export default ExecutionsEntity;
