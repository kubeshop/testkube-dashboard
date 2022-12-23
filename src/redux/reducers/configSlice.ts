import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ConfigState} from '@models/config';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const configSlice = createSlice({
  name: 'configSlice',
  initialState: initialState.config,
  reducers: {
    setApiEndpoint: (state: Draft<ConfigState>, action: PayloadAction<string>) => {
      state.apiEndpoint = action.payload;
    },
    setNamespace: (state: Draft<ConfigState>, action: PayloadAction<string>) => {
      state.namespace = action.payload;
    },
    setRedirectTarget: (state: Draft<ConfigState>, action: PayloadAction<any>) => {
      state.redirectTarget = action.payload;
    },
    clearRunTarget: (state: Draft<ConfigState>) => {
      state.redirectTarget.runTarget = false;
    },
    clearTargetTestId: (state: Draft<ConfigState>) => {
      state.redirectTarget.targetTestId = null;
    },
    clearTargetTestExecutionId: (state: Draft<ConfigState>) => {
      state.redirectTarget.targetTestExecutionId = null;
    },
    setLogOutput: (state: Draft<ConfigState>, action: PayloadAction<string>) => {
      state.fullScreenLogOutput.logOutput += action.payload;
    },
    setIsFullScreenLogOutput: (state: Draft<ConfigState>, action: PayloadAction<boolean>) => {
      state.fullScreenLogOutput.isFullScreenLogOutput = action.payload;
    },
    openFullScreenLogOutput: (state: Draft<ConfigState>, action: PayloadAction<string>) => {
      state.fullScreenLogOutput.isFullScreenLogOutput = true;
      state.fullScreenLogOutput.logOutput = action.payload;
    },
    closeFullScreenLogOutput: (state: Draft<ConfigState>) => {
      state.fullScreenLogOutput.isFullScreenLogOutput = false;
      state.fullScreenLogOutput.logOutput = '';
    },
    openSettingsTabConfig: (state: Draft<ConfigState>) => {
      state.redirectTarget.isSettingsTabConfig = true;
    },
    closeSettingsTabConfig: (state: Draft<ConfigState>) => {
      state.redirectTarget.isSettingsTabConfig = false;
    },
  },
});

export const selectApiEndpoint = (state: RootState) => state.config.apiEndpoint;
export const selectNamespace = (state: RootState) => state.config.namespace;
export const selectRedirectTarget = (state: RootState) => state.config.redirectTarget;
export const selectFullScreenLogOutput = (state: RootState) => state.config.fullScreenLogOutput;

export const {
  setApiEndpoint,
  setIsFullScreenLogOutput,
  openFullScreenLogOutput,
  closeFullScreenLogOutput,
  setRedirectTarget,
  clearTargetTestId,
  clearTargetTestExecutionId,
  clearRunTarget,
  setLogOutput,
  openSettingsTabConfig,
  closeSettingsTabConfig,
  setNamespace,
} = configSlice.actions;

export default configSlice.reducer;
