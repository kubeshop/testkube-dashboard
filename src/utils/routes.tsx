/* eslint-disable unused-imports/no-unused-imports-ts */
import {RouteProps} from 'react-router';

import {DashboardEntitiesTypesEnum} from '@models/dashboard';

import {DashboardBlueprint} from '@organisms';

import {EndointProcessing, Executions, Scripts, Tests} from '@pages';

const routes: RouteProps[] = [
  {path: '/apiEndpoint', component: EndointProcessing, exact: true},

  {
    path: '/dashboard/tests',
    render: props => <DashboardBlueprint {...props} entityType={DashboardEntitiesTypesEnum.Tests} />,
    exact: true,
  },
  {
    path: '/dashboard/scripts',
    render: props => <DashboardBlueprint {...props} entityType={DashboardEntitiesTypesEnum.Scripts} />,
    exact: true,
  },
  {
    path: '/dashboard/executions',
    render: props => <DashboardBlueprint {...props} entityType={DashboardEntitiesTypesEnum.Executions} />,
    exact: true,
  },

  // {path: '/dashboard/tests', component: Tests, exact: true},
  // {path: '/dashboard/scripts', component: Scripts, exact: true},
  // {path: '/dashboard/executions', component: Executions, exact: true},
];

export {routes};
