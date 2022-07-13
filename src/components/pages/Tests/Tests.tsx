import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityListBlueprintRenderer, NotFound} from '@pages';

const Tests: React.FC = props => {
  return (
    <>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="tests" />} />
        {/* <Route path="details" element={<TestSuiteDetails />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </>
  );
};

export default Tests;
