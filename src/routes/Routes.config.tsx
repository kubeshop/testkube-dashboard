import {Navigate} from 'react-router-dom';

import {AddEntityBlueprintRenderer, DashboardBlueprintRenderer} from '@organisms';

import {EndpointProcessing, NotFound} from '@pages';

const routesConfig = [
  {
    path: 'dashboard/tests/add-test',
    element: AddEntityBlueprintRenderer,
    props: {
      entityType: 'tests',
    },
  },
  {
    path: 'apiEndpoint',
    element: EndpointProcessing,
  },
  {
    path: 'dashboard/test-suites',
    element: DashboardBlueprintRenderer,
    props: {
      entityType: 'test-suites',
    },
  },
  {
    path: 'dashboard/tests',
    element: DashboardBlueprintRenderer,
    props: {
      entityType: 'tests',
    },
  },
  {
    path: 'dashboard/*',
    element: NotFound,
  },
  {
    path: '*',
    element: Navigate,
    props: {
      to: 'dashboard/test-suites',
    },
  },
];

export default routesConfig;
