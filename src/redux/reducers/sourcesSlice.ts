import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {SourcesState} from '@models/sources';
import {CustomSource} from '@models';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const sourcesSlice = createSlice({
  name: 'sourcesSlice',
  initialState: initialState.sources,
  reducers: {
    setSources: (state: Draft<SourcesState>, action: PayloadAction<CustomSource[]>) => {
      state.sourcesList = action.payload;
    },
    setCurrentSource: (state: Draft<SourcesState>, action: PayloadAction<CustomSource>) => {
      state.currentSource = action.payload;
    },
  },
});

export const selectSources = (state: RootState) => state.sources.sourcesList;
export const selectCurrentSource = (state: RootState) => state.sources.currentSource;

export const {setSources, setCurrentSource} = sourcesSlice.actions;

export default sourcesSlice.reducer;
