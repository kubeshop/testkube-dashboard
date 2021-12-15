import {RouteProps} from 'react-router';

import {EndointProcessing, Executions, Scripts, Tests} from '../components/pages';

const routes: RouteProps[] = [
  {path: '/apiEndpoint', component: EndointProcessing, exact: true},
  {path: '/dashboard/tests', component: Tests, exact: true},
  {path: '/dashboard/scripts', component: Scripts, exact: true},
  {path: '/dashboard/executions', component: Executions, exact: true},
];

export {routes};
