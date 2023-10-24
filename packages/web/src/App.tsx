import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useUpdate} from 'react-use';

import {PluginRoute} from '@testkube/plugins/src/internal/types';

import {Loading, NotFound} from '@pages';

import {useGeneralSlot} from '@plugins/general/hooks';

import {BannerList} from '@src/App.styled';

interface AppProps {
  routes: PluginRoute[];
}

const App: React.FC<AppProps> = ({routes}) => {
  const update = useUpdate();
  return (
    <Suspense fallback={<Loading />}>
      <BannerList items={useGeneralSlot('banners')} onClose={update} />
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div id="log-output-container" />
    </Suspense>
  );
};

export default App;
