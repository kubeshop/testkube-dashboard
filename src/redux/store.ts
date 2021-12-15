import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {createLogger} from 'redux-logger';

import scriptsSlice from '@redux/reducers/scriptsSlice';
import testsListReducer from '@redux/reducers/testsListSlice';

import {scriptsApi} from '@services/scripts';
import {testsApi} from '@services/tests';

const middlewares: Middleware[] = [testsApi.middleware, scriptsApi.middleware];

if (process.env.NODE_ENV === `development`) {
  const reduxLoggerMiddleware = createLogger();

  middlewares.push(reduxLoggerMiddleware);
}

export const store = configureStore({
  reducer: {
    testsList: testsListReducer,
    scripts: scriptsSlice,
    [testsApi.reducerPath]: testsApi.reducer,
    [scriptsApi.reducerPath]: scriptsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
