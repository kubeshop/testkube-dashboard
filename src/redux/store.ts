import {Middleware, Store, configureStore} from '@reduxjs/toolkit';

import {configApi} from '@services/config';
import {executorsApi} from '@services/executors';
import {labelsApi} from '@services/labels';
import {repositoryApi} from '@services/repository';
import {sourcesApi} from '@services/sources';
import {testSuitesApi} from '@services/testSuites';
import {testsApi} from '@services/tests';
import {triggersApi} from '@services/triggers';
import {webhooksApi} from '@services/webhooks';

const rtkModules = [
  testsApi,
  testSuitesApi,
  labelsApi,
  executorsApi,
  sourcesApi,
  triggersApi,
  configApi,
  repositoryApi,
  webhooksApi,
];

export const middlewares: Middleware[] = [
  testsApi.middleware,
  testSuitesApi.middleware,
  labelsApi.middleware,
  executorsApi.middleware,
  sourcesApi.middleware,
  triggersApi.middleware,
  configApi.middleware,
  repositoryApi.middleware,
  webhooksApi.middleware,
];

export const reducers = {
  [testSuitesApi.reducerPath]: testSuitesApi.reducer,
  [testsApi.reducerPath]: testsApi.reducer,
  [labelsApi.reducerPath]: labelsApi.reducer,
  [executorsApi.reducerPath]: executorsApi.reducer,
  [sourcesApi.reducerPath]: sourcesApi.reducer,
  [triggersApi.reducerPath]: triggersApi.reducer,
  [configApi.reducerPath]: configApi.reducer,
  [repositoryApi.reducerPath]: repositoryApi.reducer,
  [webhooksApi.reducerPath]: webhooksApi.reducer,
};

export const resetRtkCache = (targetStore: Store) => {
  rtkModules.forEach(api => targetStore.dispatch(api.util?.resetApiState()));
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});
