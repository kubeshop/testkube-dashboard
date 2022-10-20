import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {EntityMap} from '@models/entityMap';
import {Executor, ExecutorFeature, ExecutorsState} from '@models/executors';

import initialState from '@redux/initialState';

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

        types.forEach(type => {
          executorsFeaturesMap[type] = features || [];
        });
      });

      state.executorsFeaturesMap = executorsFeaturesMap;
      state.executorsList = action.payload || {};
    },
    setCurrentExecutor: (state: Draft<ExecutorsState>, action: PayloadAction<Executor>) => {
      state.currentExecutor = action.payload;
    },
  },
});

export const selectExecutors = (state: RootState) => state.executors.executorsList;
export const selectCustomExecutors = (state: RootState) =>
  state.executors.executorsList.filter(executorItem => executorItem.executor.executorType === 'container');
export const selectExecutorsFeaturesMap = (state: RootState) => state.executors.executorsFeaturesMap;
export const selectCurrentExecutor = (state: RootState) => state.executors.currentExecutor;

export const {setExecutors, setCurrentExecutor} = executorsSlice.actions;

export default executorsSlice.reducer;
