import {FC, PropsWithChildren, useContext, useMemo} from 'react';
import {
  UNSAFE_LocationContext as LocationContext,
  UNSAFE_NavigationContext as NavigationContext,
  UNSAFE_RouteContext as RouteContext,
} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import {useRouterPlugin} from '@plugins/router/hooks';

interface ReactRouterLayerProps {
  basename: string;
}

/* eslint-disable react/destructuring-assignment */

const IsolatedLayer: FC<PropsWithChildren<ReactRouterLayerProps>> = ({basename, children}) => {
  const navigationContext = useContext(NavigationContext);

  const basenamePattern = useMemo(
    () => `${navigationContext.basename.replace(/\/+$/, '')}/${basename.replace(/^\/+/, '')}`.replace(/\/+$/, ''),
    [navigationContext?.basename, basename]
  );

  const newNavigationContext = useMemo(() => ({...navigationContext, basename: basenamePattern}), [navigationContext]);

  const locationContext = useContext(LocationContext);
  const newLocationContext = useMemo(
    () => ({
      ...locationContext,
      location: {
        ...locationContext.location,
        pathname: locationContext.location.pathname.startsWith(basename)
          ? locationContext.location.pathname.substring(basename.length).replace(/^\/*/, '/')
          : '/',
      },
    }),
    [locationContext, basename]
  );

  const emptyRouteContext = useMemo(() => ({matches: [], isDataRoute: false, outlet: null}), []);

  return (
    <RouteContext.Provider value={emptyRouteContext}>
      <NavigationContext.Provider value={newNavigationContext}>
        <LocationContext.Provider value={newLocationContext}>{children}</LocationContext.Provider>
      </NavigationContext.Provider>
    </RouteContext.Provider>
  );
};

export const ReactRouterLayer: FC<PropsWithChildren<{}>> = ({children}) => {
  const basename = useRouterPlugin.select(x => x.baseUrl);
  const navigationContext = useContext(NavigationContext);
  const Router = navigationContext ? IsolatedLayer : BrowserRouter;
  return <Router basename={basename}>{children}</Router>;
};
