import {Entity} from '@models/entity';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

export const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

export const updateRequestsMap: {[key in Entity]: any} = {
  'test-suites': useUpdateTestSuiteMutation,
  tests: useUpdateTestMutation,
};
