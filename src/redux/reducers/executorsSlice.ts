import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {EntityMap} from '@models/entityMap';
import {Executor, ExecutorFeature, ExecutorsState} from '@models/executors';

import initialState from '@redux/initialState';

import {isURL, uppercaseFirstSymbol} from '@utils/strings';

import {RootState} from '../store';

export const executorsSlice = createSlice({
  name: 'executorsSlice',
  initialState: initialState.executors,
  reducers: {
    setExecutors: (state: Draft<ExecutorsState>, action: PayloadAction<Executor[]>) => {
      const executorsFeaturesMap: EntityMap<ExecutorFeature[]> = {};

      action.payload.forEach(executorItem => {
        const {
          executor: {features, types},
        } = executorItem;

        if (types) {
          types.forEach(type => {
            executorsFeaturesMap[type] = features || [];
          });
        }
      });

      state.executorsFeaturesMap = executorsFeaturesMap;
      state.executorsList =
        action.payload.map(executor => {
          const iconURI = executor.executor?.meta?.iconURI;

          if (isURL(iconURI) || !iconURI) {
            return {
              ...executor,
              displayName: executor.name,
            };
          }

          return {
            ...executor,
            displayName: uppercaseFirstSymbol(iconURI),
          };
        }) || {};
    },
    setCurrentExecutor: (state: Draft<ExecutorsState>, action: PayloadAction<string>) => {
      state.currentExecutor = action.payload;
    },
    updateCurrentExecutorData: (state: Draft<ExecutorsState>, action: PayloadAction<Partial<Executor['executor']>>) => {
      if (state.currentExecutor) {
        state.executorsList = state.executorsList.map(executor =>
          executor.name === state.currentExecutor
            ? {...executor, executor: {...executor.executor, ...action.payload}}
            : executor
        );
      }
    },
  },
});

export const selectExecutors = (state: RootState) => state.executors.executorsList;
export const selectExecutorsFeaturesMap = (state: RootState) => state.executors.executorsFeaturesMap;
export const selectCurrentExecutor = (state: RootState) =>
  state.executors.executorsList.find(executor => executor.name === state.executors.currentExecutor) as Executor;

export const {setExecutors, setCurrentExecutor, updateCurrentExecutorData} = executorsSlice.actions;

export default executorsSlice.reducer;
