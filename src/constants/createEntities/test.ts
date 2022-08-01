import {AddEntityBlueprint} from '@models/addEntity';

export const AddTest: AddEntityBlueprint = {
  pageTitle: 'Add a Test',
  wizardTitle: 'Test Details',
  route: '/dashboard/tests/add-test',
  wizardType: 'addTest',
  entityType: 'tests',
};
