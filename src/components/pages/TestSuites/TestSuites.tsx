import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityDetailsBlueprintRenderer, EntityListBlueprintRenderer, NotFound} from '@pages';

const TestSuites: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="test-suites" />} />
        <Route path="executions/:id" element={<EntityDetailsBlueprintRenderer entity="test-suites" />} />
        <Route
          path="executions/:id/execution/:execId"
          element={<EntityDetailsBlueprintRenderer entity="test-suites" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default TestSuites;
