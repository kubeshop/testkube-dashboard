import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ConfigState, Coordinates} from '@models/config';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const configSlice = createSlice({
  name: 'configSlice',
  initialState: initialState.config,
  reducers: {
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
    },
    openSettingsTabConfig: (state: Draft<ConfigState>) => {
      state.redirectTarget.isSettingsTabConfig = true;
    },
    closeSettingsTabConfig: (state: Draft<ConfigState>) => {
      state.redirectTarget.isSettingsTabConfig = false;
    },
    setLogOutputDOMRect: (state: Draft<ConfigState>, action: PayloadAction<Coordinates>) => {
      state.fullScreenLogOutput.logOutputDOMRect = action?.payload;
    },
  },
});

export const selectNamespace = (state: RootState) => state.config.namespace;
export const selectRedirectTarget = (state: RootState) => state.config.redirectTarget;
export const selectFullScreenLogOutput = (state: RootState) => state.config.fullScreenLogOutput;

export const {
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
  setLogOutputDOMRect,
} = configSlice.actions;

export default configSlice.reducer;
