import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import configSlice from '@redux/reducers/configSlice';
import executionsSlice from '@redux/reducers/executionsSlice';
import tagsSlice from '@redux/reducers/tagsSlice';
import textExecutionsSlice from '@redux/reducers/testExecutionsSlice';
import testsSlice from '@redux/reducers/testsSlice';
import testsSuitesSlice from '@redux/reducers/testsSuitesSlice';

import {executionsApi} from '@services/executions';
import {tagsApi} from '@services/tags';
import {testExecutionsApi} from '@services/testExecutions';
import {testsApi} from '@services/tests';
import {testsSuitesApi} from '@services/testsSuites';

const middlewares: Middleware[] = [
  executionsApi.middleware,
  testsApi.middleware,
  testsSuitesApi.middleware,
  tagsApi.middleware,
  testExecutionsApi.middleware,
];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger();

  middlewares.push(reduxLoggerMiddleware);
}

export const store = configureStore({
  reducer: {
    testsSuites: testsSuitesSlice,
    tests: testsSlice,
    executions: executionsSlice,
    tags: tagsSlice,
    config: configSlice,
    testExecutions: textExecutionsSlice,

    [testsSuitesApi.reducerPath]: testsSuitesApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [executionsApi.reducerPath]: executionsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [testExecutionsApi.reducerPath]: testExecutionsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
