import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import configSlice from '@redux/reducers/configSlice';
import executorsSlice from '@redux/reducers/executorsSlice';
import sourcesSlice from '@redux/reducers/sourcesSlice';
import testSuiteExecutionsSlice from '@redux/reducers/testSuiteExecutionsSlice';
import testSuitesSlice from '@redux/reducers/testSuitesSlice';
import testsSlice from '@redux/reducers/testsSlice';

import {executionsApi} from '@services/executions';
import {executorsApi} from '@services/executors';
import {labelsApi} from '@services/labels';
import {sourcesApi} from '@services/sources';
import {testSuiteExecutionsApi} from '@services/testSuiteExecutions';
import {testSuitesApi} from '@services/testSuites';
import {testsApi} from '@services/tests';

const middlewares: Middleware[] = [
  executionsApi.middleware,
  testsApi.middleware,
  testSuitesApi.middleware,
  labelsApi.middleware,
  testSuiteExecutionsApi.middleware,
  executorsApi.middleware,
  sourcesApi.middleware,
];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger();

  // middlewares.push(reduxLoggerMiddleware);
}

export const store = configureStore({
  reducer: {
    testSuites: testSuitesSlice,
    tests: testsSlice,
    config: configSlice,
    testSuiteExecutions: testSuiteExecutionsSlice,
    executors: executorsSlice,
    sources: sourcesSlice,

    [testSuitesApi.reducerPath]: testSuitesApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [executionsApi.reducerPath]: executionsApi.reducer,
    [labelsApi.reducerPath]: labelsApi.reducer,
    [testSuiteExecutionsApi.reducerPath]: testSuiteExecutionsApi.reducer,
    [executorsApi.reducerPath]: executorsApi.reducer,
    [sourcesApi.reducerPath]: sourcesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
