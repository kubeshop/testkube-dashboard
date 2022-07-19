import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityListBlueprintRenderer, NotFound} from '@pages';

const TestSuites: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="test-suites" />} />
        <Route path="details" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </>
  );
};

export default TestSuites;
