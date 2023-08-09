import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityDetailsBlueprintRenderer, NotFound} from '@pages';

import DashboardRewrite from '@src/DashboardRewrite';

import TestsList from './TestsList';

const Tests: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Backwards compatibility */}
        <Route path="executions/:id" element={<DashboardRewrite pattern="/tests/:id" />} />
        <Route
          path="executions/:id/execution/:execId"
          element={<DashboardRewrite pattern="/tests/:id/executions/:execId" />}
        />

        <Route index element={<TestsList />} />
        <Route path=":id">
          <Route index element={<EntityDetailsBlueprintRenderer entity="tests" />} />
          <Route path="commands" element={<EntityDetailsBlueprintRenderer entity="tests" tab="commands" />} />
          <Route path="executions" element={<EntityDetailsBlueprintRenderer entity="tests" tab="executions" />}>
            <Route index element={null} />
            <Route path=":execId" element={null}>
              <Route path=":execDetailsTab" element={null} />
            </Route>
          </Route>
          <Route path="settings" element={<EntityDetailsBlueprintRenderer entity="tests" tab="settings" />}>
            <Route index element={null} />
            <Route path=":settingsTab" element={null} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Tests;
