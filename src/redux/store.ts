import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import configSlice from '@redux/reducers/configSlice';
import executionsSlice from '@redux/reducers/executionsSlice';
import scriptsSlice from '@redux/reducers/scriptsSlice';
import tagsSlice from '@redux/reducers/tagsSlice';
import textExecutionsSlice from '@redux/reducers/testExecutions';
import testsSlice from '@redux/reducers/testsSlice';

import {executionsApi} from '@services/executions';
import {scriptsApi} from '@services/scripts';
import {tagsApi} from '@services/tags';
import {testExecutionsApi} from '@services/testExecutions';
import {testsApi} from '@services/tests';

const middlewares: Middleware[] = [
  executionsApi.middleware,
  scriptsApi.middleware,
  testsApi.middleware,
  tagsApi.middleware,
  testExecutionsApi.middleware,
];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger();

  // middlewares.push(reduxLoggerMiddleware);
}

export const store = configureStore({
  reducer: {
    tests: testsSlice,
    scripts: scriptsSlice,
    executions: executionsSlice,
    tags: tagsSlice,
    config: configSlice,
    testExecutions: textExecutionsSlice,

    [testsApi.reducerPath]: testsApi.reducer,
    [scriptsApi.reducerPath]: scriptsApi.reducer,
    [executionsApi.reducerPath]: executionsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [testExecutionsApi.reducerPath]: testExecutionsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
