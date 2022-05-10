import {Navigate} from 'react-router-dom';

import {CreationBlueprintRenderer, DashboardBlueprintRenderer} from '@organisms';

import {EndpointProcessing, NotFound} from '@pages';

const routesConfig = [
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
  {
    path: 'dashboard/tests/create',
    element: CreationBlueprintRenderer,
    props: {
      entityType: 'test',
    },
  },
];

export default routesConfig;
