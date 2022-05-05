import {Route, Routes} from 'react-router-dom';

import routesConfig from './Routes.config';

type RouteConfigType = {
  path: string;
  element: React.FC<any>;
  props?: Record<string, unknown>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routesConfig.map(({path, element: Element, props}: RouteConfigType) => (
        <Route path={path} element={<Element {...props} />} key={path} />
      ))}
    </Routes>
  );
};
export default AppRoutes;
