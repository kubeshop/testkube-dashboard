/* eslint-disable unused-imports/no-unused-imports-ts */
import {Navigate} from 'react-router-dom';

import {DashboardBlueprintRenderer} from '@organisms';

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
  // DO NOT TOUCH THIS :)
  // {
  //   path: '*',
  //   element: Navigate,
  //   props: {
  //     to: 'dashboard/test-suites',
  //   },
  // },
];

export default routesConfig;
