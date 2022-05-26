import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {EntityMap} from '@models/entityMap';
import {LabelsState} from '@models/labels';

import initialState from '@redux/initialState';

import {RootState} from '../store';

type SetLabelsPayload = EntityMap;

export const labelsSlice = createSlice({
  name: 'labelsSlice',
  initialState: initialState.labels,
  reducers: {
    setLabels: (state: Draft<LabelsState>, action: PayloadAction<SetLabelsPayload>) => {
      state.labelsObject = action.payload || {};
    },
  },
});

export const selectLabels = (state: RootState) => state.labels.labelsObject;

export const {setLabels} = labelsSlice.actions;

export default labelsSlice.reducer;
