import {DashboardBlueprint} from '@models/dashboard';

import {Scripts} from '@pages';

export const ScriptsEntity: DashboardBlueprint = {
  entityType: 'scripts',
  route: '/dashboard/scripts',
  reduxEntity: 'scripts',
  pageTitle: 'Scripts',
  component: Scripts,
};

export default ScriptsEntity;
