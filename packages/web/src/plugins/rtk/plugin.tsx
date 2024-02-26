import {useRef} from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

import {createPlugin} from '@testkube/plugins';

export interface RtkService {
  reducerPath: string;
  middleware: any;
  reducer: any;
  util: {resetApiState: () => any};
}

// TODO: Load base URL from the plugin instead of global scope
const rtkPlugin = createPlugin('oss/rtk').order(-1).init();

rtkPlugin.overlay.provider(() => {
  const services = Object.values(rtkPlugin.overlay.getContext()) as RtkService[];

  const store = useRef(
    configureStore({
      reducer: services.reduce((reducers, service) => ({...reducers, [service.reducerPath]: service.reducer}), {}),
      middleware: getDefaultMiddleware => [...getDefaultMiddleware(), ...services.map(service => service.middleware)],
    })
  );

  return {
    type: ReduxProvider,
    props: {store: store.current},
  };
});

export default rtkPlugin;
