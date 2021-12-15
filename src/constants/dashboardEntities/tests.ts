import {DashboardEntitiesTypesEnum, DashboardEntity} from '@models/dashboard';

import {Tests} from '@pages';

export const TestsEntity: DashboardEntity = {
  entityType: DashboardEntitiesTypesEnum.Tests,
  route: '/dashboard/tests',
  reduxEntity: 'testsList',
  pageTitle: 'Tests',
  component: Tests,
};

export default TestsEntity;
