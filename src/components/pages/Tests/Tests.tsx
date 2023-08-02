import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import NavigateRewrite from '@src/NavigateRewrite';

import TestDetails from './TestDetails';
import TestsList from './TestsList';

const Tests: FC = () => {
  return (
    <>
      <Routes>
        {/* TODO: Check if it works in Cloud Context */}
        {/* Backwards compatibility */}
        <Route path="executions/:id" element={<NavigateRewrite pattern="/tests/:id" />} />
        <Route
          path="executions/:id/execution/:execId"
          element={<NavigateRewrite pattern="/tests/:id/executions/:execId" />}
        />

        <Route index element={<TestsList />} />
        <Route path=":id">
          <Route index element={<TestDetails />} />
          <Route path="commands" element={<TestDetails tab="commands" />} />
          <Route path="executions" element={<TestDetails tab="executions" />}>
            <Route index element={null} />
            <Route path=":execId" element={null} />
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
};

export default Tests;
