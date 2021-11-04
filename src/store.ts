import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import testsListReducer from './features/testsList/testsListSlice';
import { testsApi } from './services/tests';

export const store = configureStore({
  reducer: {
    testsList: testsListReducer,
    [testsApi.reducerPath]: testsApi.reducer,
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
