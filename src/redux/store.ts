import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import configSlice from '@redux/reducers/configSlice';
import executionsSlice from '@redux/reducers/executionsSlice';
import labelsSlice from '@redux/reducers/labelsSlice';
import testSuiteExecutionsSlice from '@redux/reducers/testSuiteExecutionsSlice';
import testSuitesSlice from '@redux/reducers/testSuitesSlice';
import testsSlice from '@redux/reducers/testsSlice';

import {executionsApi} from '@services/executions';
import {labelsApi} from '@services/labels';
import {testSuiteExecutionsApi} from '@services/testSuiteExecutions';
import {testSuitesApi} from '@services/testSuites';
import {testsApi} from '@services/tests';

const middlewares: Middleware[] = [
  executionsApi.middleware,
  testsApi.middleware,
  testSuitesApi.middleware,
  labelsApi.middleware,
  testSuiteExecutionsApi.middleware,
];

export const store = configureStore({
  reducer: {
    testSuites: testSuitesSlice,
    tests: testsSlice,
    executions: executionsSlice,
    labels: labelsSlice,
    config: configSlice,
    testSuiteExecutions: testSuiteExecutionsSlice,

    [testSuitesApi.reducerPath]: testSuitesApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [executionsApi.reducerPath]: executionsApi.reducer,
    [labelsApi.reducerPath]: labelsApi.reducer,
    [testSuiteExecutionsApi.reducerPath]: testSuiteExecutionsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
