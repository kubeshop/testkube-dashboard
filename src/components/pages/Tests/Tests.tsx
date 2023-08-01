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
        {/* Backwards compatibility */}
        <Route path="executions/:id" element={<NavigateRewrite pattern="/tests/:id" />} />
        <Route
          path="executions/:id/execution/:execId"
          element={<NavigateRewrite pattern="/tests/:id/executions/:execId" />}
        />

        <Route index element={<TestsList />} />
        <Route path=":id">
          <Route index element={<TestDetails />} />
          <Route path="executions" element={<TestDetails tab="executions" />} />
          <Route path="commands" element={<TestDetails tab="commands" />} />
          <Route path="settings" element={<TestDetails tab="settings" />} />
          <Route path="executions/:execId" element={<TestDetails tab="executions" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Tests;
