import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import TriggerDetails from './TriggerDetails';
import TriggersList from './TriggersList';

const Triggers: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<TriggersList />} />
        <Route path=":id" element={<TriggerDetails />}>
          <Route index element={null} />
          <Route path="settings/:settingsTab" element={null} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Triggers;
