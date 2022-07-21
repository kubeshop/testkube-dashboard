import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityExecutionsBlueprintRenderer, EntityListBlueprintRenderer, NotFound} from '@pages';

const Tests: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="tests" />} />
        <Route path="executions/:id" element={<EntityExecutionsBlueprintRenderer entity="tests" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </>
  );
};

export default Tests;
