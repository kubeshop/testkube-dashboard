import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Script, ScriptsState} from '@models/scripts';

import initialState from '@redux/initialState';

import {RootState} from '../store';

type SetScriptsPayload = Script[];

type SetSelectedScriptPayload = any;

type SetFiltersPayload = any;

export const scriptsSlice = createSlice({
  name: 'scriptsSlice',
  initialState: initialState.scripts,
  reducers: {
    setScripts: (state: Draft<ScriptsState>, action: PayloadAction<SetScriptsPayload>) => {
      state.scriptsList = action.payload;
    },
    setFilters: (state: Draft<ScriptsState>, action: PayloadAction<SetFiltersPayload>) => {
      state.filters = action.payload;
    },
    setSelectedScript: (state: Draft<ScriptsState>, action: PayloadAction<SetSelectedScriptPayload>) => {
      state.selectedScript = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectScripts = (state: RootState) => state.scripts.scriptsList;
export const selectFilters = (state: RootState) => state.scripts.filters;
export const selectSelectedScript = (state: RootState) => state.scripts.selectedScript;
export const selectAllScriptsFilters = (state: RootState) => ({
  filters: state.scripts.filters,
  filtered: state.scripts.filtered,
  totals: state.scripts.totals,
});

export const {setScripts, setFilters, setSelectedScript} = scriptsSlice.actions;

export default scriptsSlice.reducer;
