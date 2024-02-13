/* eslint-disable no-console */
import {useMemo} from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import {Store, configureStore} from '@reduxjs/toolkit';

import {createPlugin, data, slot} from '@testkube/plugins';

export interface RtkService {
  reducerPath: string;
  middleware: any;
  reducer: any;
  util: {resetApiState: () => any};
}

// TODO: Load base URL from the plugin instead of global scope
export default createPlugin('oss/rtk')
  .order(-1)

  .define(slot<RtkService>()('rtkServices'))
  .define(data<Store>()('rtkStore'))
  .define(data<() => void>()('resetRtkCache'))

  .provider(({scope, useData, useSlot}) => {
    const services = useSlot('rtkServices');
    console.log('RTK Services: ', services);
    scope.data.rtkStore = useMemo(
      () =>
        configureStore({
          reducer: services.reduce((reducers, service) => ({...reducers, [service.reducerPath]: service.reducer}), {}),
          middleware: getDefaultMiddleware => [
            ...getDefaultMiddleware(),
            ...services.map(service => service.middleware),
          ],
        }),
      [services]
    );

    return {type: ReduxProvider as any, props: {store: scope.data.rtkStore}};
  })

  .init(tk => {
    tk.data.resetRtkCache = () => {
      tk.slots.rtkServices.all().forEach(service => {
        const action = service.util?.resetApiState();
        if (action) {
          console.log('Dispatching reset action: ', action, 'to store: ', tk.data.rtkStore);
          tk.data.rtkStore?.dispatch(action);
        }
      });
    };
  });
