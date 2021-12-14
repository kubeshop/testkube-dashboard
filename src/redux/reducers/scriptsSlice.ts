import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Script, ScriptsState} from '@types';

const initialState: ScriptsState = {
  scriptsList: [],
};

interface SetScriptsPayload {
  scriptsList: Script[];
}

export const scriptsSlice = createSlice({
  name: 'scriptsSlice',
  initialState,
  reducers: {
    setScripts: (state: Draft<ScriptsState>, action: PayloadAction<SetScriptsPayload>) => {
      state.scriptsList = action.payload.scriptsList;
    },
  },
});

export const selectScripts = (state: any) => state.scripts.scriptsList;

export const {setScripts} = scriptsSlice.actions;

export default scriptsSlice.reducer;
