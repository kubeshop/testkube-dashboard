import {DashboardEntitiesTypesEnum, DashboardEntity} from '@models/dashboard';

import {Scripts} from '@pages';

export const ScriptsEntity: DashboardEntity = {
  entityType: DashboardEntitiesTypesEnum.Scripts,
  route: '/dashboard/scripts',
  reduxEntity: 'scripts',
  pageTitle: 'Scripts',
  component: Scripts,
};

export default ScriptsEntity;
