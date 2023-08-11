import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import type {SourceWithRepository, SourcesState} from '@models/sources';

import initialState from '@redux/initialState';

import type {RootState} from '../store';

export const sourcesSlice = createSlice({
  name: 'sourcesSlice',
  initialState: initialState.sources,
  reducers: {
    setSources: (state: Draft<SourcesState>, action: PayloadAction<SourceWithRepository[]>) => {
      state.sourcesList = action.payload;
    },
    setCurrentSource: (state: Draft<SourcesState>, action: PayloadAction<SourceWithRepository | undefined>) => {
      state.currentSource = action.payload;
    },
  },
});

export const selectSources = (state: RootState) => state.sources.sourcesList;
export const selectCurrentSource = (state: RootState) => state.sources.currentSource;

export const {setSources, setCurrentSource} = sourcesSlice.actions;

export default sourcesSlice.reducer;
