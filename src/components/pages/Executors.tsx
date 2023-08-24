import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {ExecutorDetails} from './Executors/ExecutorDetails';
import {Executors as ExecutorsList} from './Executors/ExecutorsList';
import {NotFound} from './NotFound';

export const Executors: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<ExecutorsList />} />
        <Route path=":id" element={<ExecutorDetails />}>
          <Route index element={null} />
          <Route path="settings/:settingsTab" element={null} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};
