import {RouteProps} from 'react-router';

import {DashboardBlueprintRenderer} from '@organisms';

import {EndointProcessing} from '@pages';

const routes: RouteProps[] = [
  {path: '/apiEndpoint', component: EndointProcessing, exact: true},

  {
    path: '/dashboard/tests',
    render: props => <DashboardBlueprintRenderer {...props} entityType="tests" />,
    exact: true,
  },
  // {
  //   path: '/dashboard/test-executions',
  //   render: props => <DashboardBlueprintRenderer {...props} entityType="testExecutions" />,
  //   exact: true,
  // },
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
];

export {routes};
