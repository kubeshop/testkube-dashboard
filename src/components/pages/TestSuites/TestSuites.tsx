import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import TestSuiteDetails from './TestSuiteDetails';
import TestSuitesList from './TestSuitesList';

const TestSuites: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<TestSuitesList />} />
        <Route path="executions/:id" element={<TestSuiteDetails />}>
          <Route path="execution/:execId" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default TestSuites;
