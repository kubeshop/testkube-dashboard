import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Script, ScriptsState} from '@models/scripts';

import initialState from '@redux/initialState';

interface SetScriptsPayload {
  scriptsList: Script[];
}

interface SetFiltersPayload {}

export const scriptsSlice = createSlice({
  name: 'scriptsSlice',
  initialState: initialState.scripts,
  reducers: {
    setScripts: (state: Draft<ScriptsState>, action: PayloadAction<SetScriptsPayload>) => {
      state.scriptsList = action.payload.scriptsList;
    },
    setFilters: (state: Draft<ScriptsState>, action: PayloadAction<SetFiltersPayload>) => {},
  },
});

export const selectScripts = (state: any) => state.scripts.scriptsList;

export const {setScripts} = scriptsSlice.actions;

export default scriptsSlice.reducer;
