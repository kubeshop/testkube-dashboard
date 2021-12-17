import {DashboardBlueprint} from '@models/dashboard';

import {Tests} from '@pages';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'testsList',
  pageTitle: 'Tests',
  component: Tests,
};

export default TestsEntity;
