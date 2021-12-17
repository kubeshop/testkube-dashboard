/* eslint-disable unused-imports/no-unused-imports-ts */
import {RouteProps} from 'react-router';

import {DashboardBlueprintRenderer} from '@organisms';

import {EndointProcessing, Executions, Scripts, Tests} from '@pages';

const routes: RouteProps[] = [
  {path: '/apiEndpoint', component: EndointProcessing, exact: true},

  {
    path: '/dashboard/tests',
    render: props => <DashboardBlueprintRenderer {...props} entityType="tests" />,
    exact: true,
  },
  {
    path: '/dashboard/scripts',
    render: props => <DashboardBlueprintRenderer {...props} entityType="scripts" />,
    exact: true,
  },
  {
    path: '/dashboard/executions',
    render: props => <DashboardBlueprintRenderer {...props} entityType="executions" />,
    exact: true,
  },

  // {path: '/dashboard/tests', component: Tests, exact: true},
  // {path: '/dashboard/scripts', component: Scripts, exact: true},
  // {path: '/dashboard/executions', component: Executions, exact: true},
];

export {routes};
