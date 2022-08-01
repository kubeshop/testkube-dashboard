import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ExecutorsState} from '@models/executors';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const executorsSlice = createSlice({
  name: 'executorsSlice',
  initialState: initialState.executors,
  reducers: {
    setExecutors: (state: Draft<ExecutorsState>, action: PayloadAction<any>) => {
      state.executorsList = action.payload || {};
    },
  },
});

export const selectExecutors = (state: RootState) => state.executors.executorsList;

export const {setExecutors} = executorsSlice.actions;

export default executorsSlice.reducer;
