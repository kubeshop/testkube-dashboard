import {Outlet, Route, Routes} from 'react-router-dom';

import {NotFound} from '@pages';

import SourceDetails from './SourceDetails';
import SourcesList from './SourcesList';

const Sources: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<SourcesList />} />
        <Route path=":id" element={<SourceDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Sources;
