import {DashboardEntitiesTypesEnum, DashboardEntity} from '@models/dashboard';

import {Executions} from '@pages';

export const ExecutionsEntity: DashboardEntity = {
  entityType: DashboardEntitiesTypesEnum.Executions,
  route: '/dashboard/executions',
  pageTitle: 'Executions',
  component: Executions,
};

export default ExecutionsEntity;
