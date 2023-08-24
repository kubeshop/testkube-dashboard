import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import DashboardRewrite from '@src/DashboardRewrite';

import TestDetails from './TestDetails';
import TestsList from './TestsList';

const Tests: FC = () => (
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
        <Route index element={<TestDetails tab="executions" />} />
        <Route path="commands" element={<TestDetails tab="commands" />} />
        <Route path="executions" element={<TestDetails tab="executions" />}>
          <Route index element={null} />
          <Route path=":execId" element={null}>
            <Route path=":execDetailsTab" element={null} />
          </Route>
        </Route>
        <Route path="settings" element={<TestDetails tab="settings" />}>
          <Route index element={null} />
          <Route path=":settingsTab" element={null} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Outlet />
  </>
);

export default Tests;
