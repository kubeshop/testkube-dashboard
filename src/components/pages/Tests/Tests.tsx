import {Outlet, Route, Routes} from 'react-router-dom';

import {EntityListBlueprintRenderer, NotFound} from '@pages';

import {Title} from '@src/components/custom-antd';

const Tests: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<EntityListBlueprintRenderer entity="tests" />} />
        <Route path="details" element={<Title>adsasdas</Title>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </>
  );
};

export default Tests;
