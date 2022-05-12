import {AddEntityBlueprint} from '@models/addEntity';

import {testsDashboardGradient} from '@styles/gradients';

export const AddTest: AddEntityBlueprint = {
  pageTitle: 'Add a Test',
  wizardTitle: 'Test Details',
  gradient: testsDashboardGradient,
  route: '/dashboard/tests/add-test',
  wizardType: 'addTest',
  entityType: 'tests',
};
