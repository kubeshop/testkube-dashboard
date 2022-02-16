import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {TestsSuitesState} from '@models/testsSuites';

import initialState from '@redux/initialState';

import {RootState} from '../store';

export const testsSuitesSlice = createSlice({
  name: 'testsSuitesSlice',
  initialState: initialState.testsSuites,
  reducers: {
    setTestsSuites: (state: Draft<TestsSuitesState>, action: PayloadAction<any>) => {
      state.dataList = action.payload;
    },
    setTestsSuitesFilters: (state: Draft<TestsSuitesState>, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setSelectedTestSuite: (state: Draft<TestsSuitesState>, action: PayloadAction<any>) => {
      state.selectedTestSuite = action.payload[0] || action.payload.selectedRecord;
    },
  },
});

export const selectTestsSuites = (state: RootState) => state.testsSuites.dataList;
export const selectTestsSuitesFilters = (state: RootState) => state.testsSuites.filters;
export const selectSelectedTestSuite = (state: RootState) => state.testsSuites.selectedTestSuite;
export const selectAllTestsSuitesFilters = (state: RootState) => ({
  filters: state.testsSuites.filters,
  filtered: state.testsSuites.filtered,
  totals: state.testsSuites.totals,
});

export const {setTestsSuites, setTestsSuitesFilters, setSelectedTestSuite} = testsSuitesSlice.actions;

export default testsSuitesSlice.reducer;
