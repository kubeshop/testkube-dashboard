import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {DashboardRewrite} from '@src/DashboardRewrite';

import {NotFound} from './NotFound';
import {TestSuiteDetails} from './TestSuites/TestSuiteDetails';
import {TestSuitesList} from './TestSuites/TestSuitesList';

export const TestSuites: FC = () => (
  <>
    <Routes>
      {/* Backwards compatibility */}
      <Route path="executions/:id" element={<DashboardRewrite pattern="/tests/:id" />} />
      <Route
        path="executions/:id/execution/:execId"
        element={<DashboardRewrite pattern="/tests/:id/executions/:execId" />}
      />

      <Route index element={<TestSuitesList />} />
      <Route path=":id">
        <Route index element={<TestSuiteDetails tab="executions" />} />
        <Route path="commands" element={<TestSuiteDetails tab="commands" />} />
        <Route path="executions" element={<TestSuiteDetails tab="executions" />}>
          <Route index element={null} />
          <Route path=":execId" element={null} />
        </Route>
        <Route path="settings" element={<TestSuiteDetails tab="settings" />}>
          <Route index element={null} />
          <Route path=":settingsTab" element={null} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Outlet />
  </>
);
