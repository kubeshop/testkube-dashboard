import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {EntityMap} from '@models/entityMap';
import {Executor, ExecutorFeature, ExecutorsState, ImagePullSecret} from '@models/executors';

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
          const iconURI = executor.executor.meta.iconURI;
          if (isURL(iconURI)) {
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
    setCurrentExecutor: (state: Draft<ExecutorsState>, action: PayloadAction<Executor>) => {
      state.currentExecutor = action.payload;
    },
    updateExecutorContainerImage: (
      state: Draft<ExecutorsState>,
      action: PayloadAction<Executor['executor']['image']>
    ) => {
      if (state.currentExecutor) {
        if (state.currentExecutor.executor) {
          state.currentExecutor.executor.image = action.payload;
        }
      }
    },
    updateExecutorPrivateRegistry: (state: Draft<ExecutorsState>, action: PayloadAction<ImagePullSecret['name']>) => {
      if (state.currentExecutor) {
        if (state.currentExecutor.executor) {
          state.currentExecutor.executor.imagePullSecrets = [{name: action.payload}];
        }
      }
    },
    updateExecutorCommand: (state: Draft<ExecutorsState>, action: PayloadAction<string>) => {
      if (state.currentExecutor) {
        if (state.currentExecutor.executor) {
          state.currentExecutor.executor.command = action.payload.split(' ');
        }
      }
    },
    updateExecutorArguments: (state: Draft<ExecutorsState>, action: PayloadAction<Executor['executor']['args']>) => {
      if (state.currentExecutor) {
        if (state.currentExecutor.executor) {
          state.currentExecutor.executor.args = action.payload;
        }
      }
    },
  },
});

export const selectExecutors = (state: RootState) => state.executors.executorsList;
export const selectCustomExecutors = (state: RootState) =>
  state.executors.executorsList.filter(executorItem => executorItem.executor.executorType === 'container');
export const selectExecutorsFeaturesMap = (state: RootState) => state.executors.executorsFeaturesMap;
export const selectCurrentExecutor = (state: RootState) => state.executors.currentExecutor as Executor;

export const {
  setExecutors,
  setCurrentExecutor,
  updateExecutorContainerImage,
  updateExecutorPrivateRegistry,
  updateExecutorCommand,
  updateExecutorArguments,
} = executorsSlice.actions;

export default executorsSlice.reducer;
