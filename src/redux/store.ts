import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import executionsSlice from '@redux/reducers/executionsSlice';
import scriptsSlice from '@redux/reducers/scriptsSlice';
import testsSlice from '@redux/reducers/testsSlice';

import {executionsApi} from '@services/executions';
import {scriptsApi} from '@services/scripts';
import {testsApi} from '@services/tests';

const middlewares: Middleware[] = [executionsApi.middleware, scriptsApi.middleware, testsApi.middleware];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger();

  middlewares.push(reduxLoggerMiddleware);
}

export const store = configureStore({
  reducer: {
    tests: testsSlice,
    scripts: scriptsSlice,
    executions: executionsSlice,

    [testsApi.reducerPath]: testsApi.reducer,
    [scriptsApi.reducerPath]: scriptsApi.reducer,
    [executionsApi.reducerPath]: executionsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
