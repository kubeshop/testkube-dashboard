import {Route, Routes} from 'react-router-dom';

import routesConfig from './Routes.config';

type RouteConfigType = {
  path: string;
  element: React.FC<any>;
  props?: Record<string, unknown>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map(({path, element: Element, props}: RouteConfigType) => (
        <Route path={path} element={<Element {...props} />} />
      ))}
    </Routes>
  );
};
export default AppRoutes;
