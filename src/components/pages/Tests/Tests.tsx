import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityDetailsBlueprintRenderer, NotFound} from '@pages';

import TestsList from './TestsList';

const Tests: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<TestsList />} />
        <Route path="executions/:id" element={<EntityDetailsBlueprintRenderer entity="tests" />} />
        <Route path="executions/:id/execution/:execId" element={<EntityDetailsBlueprintRenderer entity="tests" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Tests;
