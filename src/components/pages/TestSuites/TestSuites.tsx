import {Outlet, Route, Routes} from 'react-router-dom';

import EntityListBlueprintRenderer from '@organisms/EntityListBlueprintRenderer';

import NotFound from '../NotFound';

const TestSuites: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="test-suites" />} />
        {/* <Route path="details" element={<TestSuiteDetails />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </div>
  );
};

export default TestSuites;
