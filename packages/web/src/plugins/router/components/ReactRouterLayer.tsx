import {FC, PropsWithChildren, useContext, useMemo} from 'react';
import {UNSAFE_LocationContext as LocationContext, UNSAFE_NavigationContext as NavigationContext} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

interface ReactRouterLayerProps {
  basename: string;
}

/* eslint-disable react/destructuring-assignment */

const IsolatedLayer: FC<PropsWithChildren<ReactRouterLayerProps>> = ({basename, children}) => {
  const navigationContext = useContext(NavigationContext);
  const newNavigationContext = useMemo(
    () => ({
      ...navigationContext,
      basename: `${navigationContext.basename.replace(/\/+$/, '')}/${basename.replace(/^\/+/, '')}`.replace(/\/+$/, ''),
    }),
    [navigationContext]
  );

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
    [locationContext]
  );

  return (
    <NavigationContext.Provider value={newNavigationContext}>
      <LocationContext.Provider value={newLocationContext}>{children}</LocationContext.Provider>
    </NavigationContext.Provider>
  );
};

export const ReactRouterLayer: FC<PropsWithChildren<ReactRouterLayerProps>> = ({basename, children}) => {
  const navigationContext = useContext(NavigationContext);
  const Router = navigationContext ? IsolatedLayer : BrowserRouter;
  return <Router basename={basename}>{children}</Router>;
};
