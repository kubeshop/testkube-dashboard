import {useMemo} from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import {Store, configureStore} from '@reduxjs/toolkit';

import {createPlugin, createUseSlot, data, slot} from '@testkube/plugins';

export interface RtkService {
  reducerPath: string;
  middleware: any;
  reducer: any;
  util: {resetApiState: () => any};
}

const useOwnSlot = createUseSlot();

// TODO: Load base URL from the plugin instead of global scope
export default createPlugin('oss/rtk')
  .order(-1)

  .define(slot<RtkService>()('rtkServices'))
  .define(data<Store>()('rtkStore'))
  .define(data<() => void>()('resetRtkCache'))

  .provider(tk => {
    // TODO: Extract to 'init'?
    const services = useOwnSlot('rtkServices');
    tk.data.rtkStore = useMemo(
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

    return {type: ReduxProvider as any, props: {store: tk.data.rtkStore}};
  })

  .init(tk => {
    tk.data.resetRtkCache = () => {
      tk.slots.rtkServices.all().forEach(service => {
        const action = service.util?.resetApiState();
        if (action) {
          tk.data.rtkStore?.dispatch(action);
        }
      });
    };
  });
