import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityDetailsBlueprintRenderer, NotFound} from '@pages';

import DashboardRewrite from '@src/DashboardRewrite';

import TestSuitesList from './TestSuitesList';

const TestSuites: React.FC = () => {
  return (
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
          <Route index element={<EntityDetailsBlueprintRenderer entity="test-suites" />} />
          <Route path="commands" element={<EntityDetailsBlueprintRenderer entity="test-suites" tab="commands" />} />
          <Route path="executions" element={<EntityDetailsBlueprintRenderer entity="test-suites" tab="executions" />}>
            <Route index element={null} />
            <Route path=":execId" element={null} />
          </Route>
          <Route path="settings" element={<EntityDetailsBlueprintRenderer entity="test-suites" tab="settings" />}>
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

export default TestSuites;
