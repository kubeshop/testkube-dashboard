import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import TriggerDetails from './TriggerDetails';
import TriggersList from './TriggersList';

const Sources: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<TriggersList />} />
        <Route path=":id" element={<TriggerDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Sources;
