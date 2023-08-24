import {FC} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from './NotFound';
import {SourceDetails} from './Sources/SourceDetails';
import {Sources as SourcesList} from './Sources/SourcesList';

export const Sources: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<SourcesList />} />
        <Route path=":id" element={<SourceDetails />}>
          <Route index element={null} />
          <Route path="settings/:settingsTab" element={null} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};
