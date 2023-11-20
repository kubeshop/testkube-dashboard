import React, {Fragment, Suspense, createElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import {PluginRoute} from '@testkube/plugins/src/internal/types';

import {Loading, NotFound} from '@pages';

import {useGeneralSlot} from '@plugins/general/hooks';

interface AppProps {
  routes: PluginRoute[];
}

const App: React.FC<AppProps> = ({routes}) => (
  <Suspense fallback={<Loading />}>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {useGeneralSlot('contentTop').map((element, i) => createElement(Fragment, {key: i}, element))}
    <Routes>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <div id="log-output-container" />
  </Suspense>
);

export default App;
