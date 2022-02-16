import {Route} from 'react-router-dom';

import {DashboardBlueprintRenderer} from '@organisms';

import {EndpointProcessing} from '@pages';

// TODO: can't pass these Routes to the App.tsx for some reason after migrating from react-router v5 to v6.
const routes = [
  <Route path="apiEndpoint" element={<EndpointProcessing />} />,
  <Route path="dashboard/test-suites" element={<DashboardBlueprintRenderer entityType="tests-suites" />} />,
  // <Route path="dashboard/test-executions" element={<DashboardBlueprintRenderer entityType="test-executions" />} />,
  <Route path="dashboard/tests" element={<DashboardBlueprintRenderer entityType="tests" />} />,
  // <Route path="dashboard/executions" element={<DashboardBlueprintRenderer entityType="executions" />} />,
];

export {routes};
