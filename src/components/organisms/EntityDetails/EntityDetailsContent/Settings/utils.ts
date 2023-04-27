import {MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Entity} from '@models/entity';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

export const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

export const updateRequestsMap: Record<Entity, UseMutation<MutationDefinition<any, any, never, void>>> = {
  'test-suites': useUpdateTestSuiteMutation,
  tests: useUpdateTestMutation,
};
