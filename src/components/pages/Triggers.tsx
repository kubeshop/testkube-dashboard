import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from './NotFound';
import {TriggerDetails} from './Triggers/TriggerDetails';
import {TriggersList} from './Triggers/TriggersList';

export const Triggers: FC = () => {
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
