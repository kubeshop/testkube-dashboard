import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import ExecutorDetails from '@pages/Executors/ExecutorDetails';
import ExecutorsList from '@pages/Executors/ExecutorsList/ExecutorsList';

import type GeneralPlugin from '@plugins/general/plugin';

import {
  initializeExecutorsStore,
  useExecutors,
  useExecutorsField,
  useExecutorsPick,
  useExecutorsSync,
} from '@store/executors';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Make provider for fetching executors automatically
export default createPlugin('oss/executors')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))

  .route('/executors', <ExecutorsList />)
  .route('/executors/:id', <ExecutorDetails />)
  .route('/executors/:id/settings/:settingsTab', <ExecutorDetails />)

  .provider(tk => <StoreProvider store={initializeExecutorsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useExecutors, useExecutorsPick, useExecutorsField, useExecutorsSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/executors', icon: ExecutorsIcon, title: 'Executors'}, {order: -80});
  });
