import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ConfigState, Coordinates} from '@models/config';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const configSlice = createSlice({
  name: 'configSlice',
  initialState: initialState.config,
  reducers: {
    setLogOutput: (state: Draft<ConfigState>, action: PayloadAction<string>) => {
      state.fullScreenLogOutput.logOutput += action.payload;
    },
    setIsFullScreenLogOutput: (state: Draft<ConfigState>, action: PayloadAction<boolean>) => {
      state.fullScreenLogOutput.isFullScreenLogOutput = action.payload;
    },
    closeFullScreenLogOutput: (state: Draft<ConfigState>) => {
      state.fullScreenLogOutput.isFullScreenLogOutput = false;
      state.fullScreenLogOutput.logOutput = '';
    },
    setLogOutputDOMRect: (state: Draft<ConfigState>, action: PayloadAction<Coordinates>) => {
      state.fullScreenLogOutput.logOutputDOMRect = action?.payload;
    },
  },
});

export const selectFullScreenLogOutput = (state: RootState) => state.config.fullScreenLogOutput;

export const {setIsFullScreenLogOutput, closeFullScreenLogOutput, setLogOutput, setLogOutputDOMRect} =
  configSlice.actions;

export default configSlice.reducer;
