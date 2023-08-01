import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import TestDetails from './TestDetails';
import TestsList from './TestsList';

const Tests: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<TestsList />} />
        <Route path="executions/:id" element={<TestDetails />}>
          <Route path="execution/:execId" element={null} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Tests;
