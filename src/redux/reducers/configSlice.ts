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
  },
});

export const selectApiEndpoint = (state: RootState) => state.config.apiEndpoint;

export const {setApiEndpoint} = configSlice.actions;

export default configSlice.reducer;
