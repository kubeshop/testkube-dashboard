import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {SourceWithRepository, SourcesState} from '@models/sources';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const sourcesSlice = createSlice({
  name: 'sourcesSlice',
  initialState: initialState.sources,
  reducers: {
    setSources: (state: Draft<SourcesState>, action: PayloadAction<SourceWithRepository[]>) => {
      state.sourcesList = action.payload;
    },
  },
});

export const selectSources = (state: RootState) => state.sources.sourcesList;

export const {setSources} = sourcesSlice.actions;

export default sourcesSlice.reducer;
