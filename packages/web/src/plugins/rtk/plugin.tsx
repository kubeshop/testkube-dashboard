import {useMemo} from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import {Store, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import {createPlugin, data, slot} from '@testkube/plugins';

export interface RtkService {
  reducerPath: string;
  middleware: any;
  reducer: any;
  util: {resetApiState: () => any};
}

let store: Store | null;

// TODO: Load base URL from the plugin instead of global scope
const ossRtkPlugin = createPlugin('oss/rtk')
  .order(-1)

  .define(slot<RtkService>()('rtkServices'))
  .define(data<Store>()('rtkStore'))
  .define(data<() => void>()('resetRtkCache'))

  // .provider(({scope}) => {
  //   scope.data.rtkStore = useMemo(() => {
  //     if (!store) {
  //       const services = Object.values(ossRtkPlugin.getGlobals());
  //       store = configureStore({
  //         reducer: services.reduce((reducers, service) => ({...reducers, [service.reducerPath]: service.reducer}), {}),
  //         middleware: getDefaultMiddleware => [
  //           ...getDefaultMiddleware(),
  //           createLogger({
  //             predicate: (_, action) => {
  //               return (
  //                 action.type.startsWith('testsApi/executeQuery') ||
  //                 action.type.startsWith('testSuitesApi/executeQuery')
  //               );
  //             },
  //             collapsed: true,
  //           }),
  //           ...services.map(service => service.middleware),
  //         ],
  //       });
  //     }
  //     return store;
  //   }, []);

  //   return {type: ReduxProvider as any, props: {store: scope.data.rtkStore}};
  // })

  .init(tk => {
    // tk.data.resetRtkCache = () => {
    //   tk.slots.rtkServices.all().forEach(service => {
    //     const action = service.util?.resetApiState();
    //     if (action) {
    //       tk.data.rtkStore?.dispatch(action);
    //     }
    //   });
    // };

    ossRtkPlugin.getGlobals();
  });

export default ossRtkPlugin;
