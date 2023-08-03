import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import ExecutorDetails from './ExecutorDetails';
import ExecutorsList from './ExecutorsList';

const Executors: React.FC = () => {
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

export default Executors;
